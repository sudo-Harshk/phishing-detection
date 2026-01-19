# System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                        │
│                    http://localhost:5173                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  SecurityAnalysisConsole                                   │ │
│  │  ├── EmailContentPanel (input)                             │ │
│  │  └── AnalysisResultPanel (output)                          │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │ POST /api/predict
                             │ JSON: { text: string }
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Backend (FastAPI)                           │
│                    http://localhost:8000                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  API Layer (app/api/predict.py)                            │ │
│  │  └── POST /api/predict                                     │ │
│  └────────────────────────────┬───────────────────────────────┘ │
│                               ▼                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Inference Layer (app/core/)                               │ │
│  │  ├── hf_distilbert_inference.py (active)                   │ │
│  │  ├── inference.py (CharGRU - alternative)                  │ │
│  │  ├── preprocessing.py                                      │ │
│  │  └── model_loader.py                                       │ │
│  └────────────────────────────┬───────────────────────────────┘ │
│                               ▼                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Model Layer                                               │ │
│  │  ├── DistilBERT (HuggingFace - primary)                    │ │
│  │  └── CharGRU (Keras - models/chargru_advtrain_model.keras) │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Components

### Frontend

| Component | Path | Purpose |
|-----------|------|---------|
| `App.tsx` | `src/App.tsx` | Root component |
| `DemoPage` | `src/pages/DemoPage.tsx` | Entry page |
| `SecurityAnalysisConsole` | `src/components/layout/` | Main console layout |
| `EmailContentPanel` | `src/components/panels/` | Text input area |
| `AnalysisResultPanel` | `src/components/panels/` | Results display |

### Backend

| Module | Path | Purpose |
|--------|------|---------|
| `main.py` | `app/main.py` | FastAPI app, CORS, routes |
| `predict.py` | `app/api/predict.py` | `/api/predict` endpoint |
| `hf_distilbert_inference.py` | `app/core/` | DistilBERT inference |
| `inference.py` | `app/core/` | CharGRU inference |
| `preprocessing.py` | `app/core/` | Text preprocessing |
| `model_loader.py` | `app/core/` | Keras model loader |
| `config.py` | `app/config.py` | Paths and constants |

## Data Flow

1. User enters email text in `EmailContentPanel`
2. Click "Analyze" → `POST /api/predict` with `{ text: string }`
3. Backend preprocesses text (tokenization)
4. DistilBERT model runs inference
5. Response: `{ label, risk_level, phishing_probability, latency_ms }`
6. `AnalysisResultPanel` displays result

## Models

### Primary: DistilBERT
- Source: `cybersectony/phishing-email-detection-distilbert_v2.1` (HuggingFace)
- Max tokens: 512
- Output: Binary classification (Clean/Phishing)

### Alternative: CharGRU
- File: `models/chargru_advtrain_model.keras`
- Input: Character-level sequences (1500 chars, 95-symbol vocab)
- Adversarial-trained variant

## Thresholds

| Probability | Label | Risk Level |
|-------------|-------|------------|
| ≥ 0.85 | Phishing | High |
| ≥ 0.60 | Suspicious | Moderate |
| < 0.60 | Clean | Low |
