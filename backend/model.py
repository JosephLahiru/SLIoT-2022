from pydantic import BaseModel

class Entry(BaseModel):
    id: str
    date: str
    time: str
    value: str