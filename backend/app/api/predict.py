from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.hf_distilbert_inference import predict_email_distilbert
from app.core.virustotal import scan_url

router = APIRouter()


class PredictRequest(BaseModel):
    text: str


def _is_url(text: str) -> bool:
    stripped = text.strip()
    return stripped.startswith("http://") or stripped.startswith("https://")


@router.post("/predict")
def predict(req: PredictRequest):
    try:
        if _is_url(req.text):
            return scan_url(req.text.strip())
        return predict_email_distilbert(req.text)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal error during inference")
