from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.predict import router as predict_router

app = FastAPI(
    title="Phishing Detection API",
    description="Character-level phishing email detection (research demo)",
    version="1.0"
)

# CORS middleware for frontend
# Allow all origins for Docker networking flexibility
# In production, restrict to specific domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}
