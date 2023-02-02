from model import Entry
import os
from dotenv import load_dotenv

load_dotenv()

#MongoDB driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGO_URI'))
database = client.Entries
collection = database.entry

async def fetch_all_entries():
    entries = []
    curser = collection.find({})
    async for document in curser:
        entries.append(Entry(**document))
    return entries