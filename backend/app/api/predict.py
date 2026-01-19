from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.hf_distilbert_inference import predict_email_distilbert

router = APIRouter()


class PredictRequest(BaseModel):
    text: str


@router.post("/predict")
def predict(req: PredictRequest):
    try:
        return predict_email_distilbert(req.text)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal error during inference"
        )
