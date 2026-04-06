from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

VIRUSTOTAL_API_KEY: str = os.getenv("VIRUSTOTAL_API_KEY", "")

MODEL_DIR = BASE_DIR / "models"
ASSETS_DIR = BASE_DIR / "assets"

CHARGRU_MODEL_PATH = MODEL_DIR / "chargru_advtrain_model.keras"

MAX_INPUT_LENGTH = 1500
CHAR_VOCAB_SIZE = 95

DEMO_MODE = True
