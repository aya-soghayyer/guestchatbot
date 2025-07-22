# ai_response.py
import aiohttp
from dotenv import load_dotenv
import os
import json
from app.types.chat import Messages
import openai
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.mongoatlas import get_atlas_db

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("API_KEY")
openai_url = "https://api.openai.com/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

async def AIResponse(payload: Messages):
    request_payload = {
        "model": "gpt-4.1",
        "messages": [msg.dict() for msg in payload.messages],
        "max_tokens": 500,
        "temperature": 0,
        "stream": True
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(openai_url, headers=headers, json=request_payload) as response:
            if response.status // 100 != 2:
                raise Exception(f"Error: {await response.text()}")

            buffer = ""
            async for chunk in response.content.iter_any():
                if chunk:
                    chunk_str = chunk.decode('utf-8')
                    buffer += chunk_str

                    while "\n\n" in buffer:
                        event, buffer = buffer.split("\n\n", 1)
                        for line in event.split("\n"):
                            if line.startswith("data:"):
                                data_str = line[5:].strip()
                                if data_str == "[DONE]":
                                    return
                                if not data_str:
                                    continue
                                try:
                                    data = json.loads(data_str)
                                    delta = data.get("choices", [{}])[0].get("delta", {})
                                    content = delta.get("content", "")
                                    if content:
                                        yield content
                                except json.JSONDecodeError as e:
                                    print(f"Error parsing JSON: {data_str} ({e})")


def generate_embeddings(chunks):
    response = openai.embeddings.create(
        model="text-embedding-ada-002",
        input=chunks
    )
    
    return [
        {
            "text": chunks[i],
            "embedding_table": embedding.embedding
        }
        for i, embedding in enumerate(response.data)
    ]
    
    
async def getContext(user_question: str, context_number: int):
    

    question_embedding = generate_embeddings(user_question)[0]['embedding_table']
    db: AsyncIOMotorDatabase =  await get_atlas_db()
    collection = db["hu_information"]
    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_search",
                "path": "embedding_table",
                "queryVector": question_embedding,
                "numCandidates": 100,
                "limit": context_number
            }
        },
        {
            "$project": {
                "text": 1,
                "_id": 0,
                "score": {"$meta": "vectorSearchScore"}
            }
        }
    ]

    results = await collection.aggregate(pipeline).to_list(length=context_number)
    top_contexts = [doc["text"] for doc in results if "text" in doc]

    return top_contexts