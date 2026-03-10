from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_DIR = BASE_DIR / "models"
ASSETS_DIR = BASE_DIR / "assets"

CHARGRU_MODEL_PATH = MODEL_DIR / "chargru_advtrain_model.keras"

MAX_INPUT_LENGTH = 1500
CHAR_VOCAB_SIZE = 95

DEMO_MODE = True
