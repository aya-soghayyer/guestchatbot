from pydantic import BaseModel, Field
from typing import List, Annotated

class Message(BaseModel):
    role: str
    content: Annotated[str, Field(max_length=200)]

class Messages(BaseModel):
    messages: Annotated[List[Message], Field(max_items=7)]
