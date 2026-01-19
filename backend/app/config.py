from pathlib import Path

# Project base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Paths
MODEL_DIR = BASE_DIR / "models"
ASSETS_DIR = BASE_DIR / "assets"

# Model files
CHARGRU_MODEL_PATH = MODEL_DIR / "chargru_advtrain_model.keras"

# Preprocessing constraints (from paper)
MAX_INPUT_LENGTH = 1500
CHAR_VOCAB_SIZE = 95

# Demo mode
DEMO_MODE = True
