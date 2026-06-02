import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@127.0.0.1:5432/cafe_fausse",
)
FLASK_PORT = int(os.getenv("FLASK_PORT", "5000"))
TOTAL_TABLES = 30
