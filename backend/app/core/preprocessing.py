import json
import re
import numpy as np
from bs4 import BeautifulSoup
from app.config import ASSETS_DIR, MAX_INPUT_LENGTH


# Load character dictionary once
with open(ASSETS_DIR / "char_dictionary.json", "r", encoding="utf-8") as f:
    CHAR_DICT = json.load(f)

PAD_IDX = CHAR_DICT.get("<PAD>", 0)
UNK_IDX = CHAR_DICT.get("<UNK>", 1)


def strip_html(text: str) -> str:
    soup = BeautifulSoup(text, "lxml")
    return soup.get_text(separator=" ")


def remove_headers(text: str) -> str:
    lines = text.splitlines()
    body_lines = []
    for line in lines:
        if re.match(r"^(from|to|subject|date):", line.strip().lower()):
            continue
        body_lines.append(line)
    return "\n".join(body_lines)


def normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def text_to_sequence(text: str) -> np.ndarray:
    seq = np.full(MAX_INPUT_LENGTH, PAD_IDX, dtype=np.int16)

    for i, ch in enumerate(text[:MAX_INPUT_LENGTH]):
        seq[i] = CHAR_DICT.get(ch, UNK_IDX)

    return seq


def preprocess_email(text: str) -> np.ndarray:
    if not text or not text.strip():
        raise ValueError("Empty input")

    text = strip_html(text)
    text = remove_headers(text)
    text = normalize_text(text)

    seq = text_to_sequence(text)

    # Model expects batch dimension
    return np.expand_dims(seq, axis=0)
