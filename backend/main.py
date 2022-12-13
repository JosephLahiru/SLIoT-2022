from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import Bin

app = FastAPI()

from database import (
    fetch_all_entries,
)

origins = ['http://localhost:3000',
            'http://localhost',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping":"Pong"}

@app.get("/api/entry")
async def get_entry():
    reponse = await fetch_all_entries()
    return reponse