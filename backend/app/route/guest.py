from fastapi import APIRouter, HTTPException
from app.types.chat import Messages
from app.service.chatbot_response import AIResponse
import json
from fastapi.responses import StreamingResponse




router = APIRouter(prefix='/guest')

@router.post('/addmessage')
async def addMessage(
    payload: Messages,
):
    try:

        async def stream_response():
                        
            async for ai_message_chunk in AIResponse(payload=payload):
                if isinstance(ai_message_chunk, dict):
                    pass
                else:
                    yield f"data: {json.dumps({'content': ai_message_chunk})}\n\n"
                    
            yield f"data: {json.dumps({'status': '[DONE]', 'chat_id': payload.chat_id})}\n\n"
            

        return StreamingResponse(
            stream_response(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            }
        )

    except HTTPException as http_exc:
        raise http_exc  

    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {str(e)}")

