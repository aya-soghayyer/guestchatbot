from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str
    content: str

class Messages(BaseModel):
    messages: List[Message]
