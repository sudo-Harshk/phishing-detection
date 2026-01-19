# Project Structure

```
phishing-detection-final/
├── README.md                    # Project overview
├── docker-compose.yml           # One-command deployment
├── .gitignore
│
├── backend/                     # FastAPI server
│   ├── Dockerfile               # Backend container
│   ├── .dockerignore
│   ├── requirements.txt         # Python dependencies
│   ├── app/
│   │   ├── main.py              # FastAPI app entry
│   │   ├── config.py            # Configuration constants
│   │   ├── api/
│   │   │   └── predict.py       # /api/predict endpoint
│   │   ├── core/
│   │   │   ├── hf_distilbert_inference.py  # DistilBERT model (active)
│   │   │   ├── inference.py     # CharGRU inference
│   │   │   ├── model_loader.py  # Keras model loading
│   │   │   └── preprocessing.py # Text preprocessing
│   │   └── utils/
│   │       └── logger.py
│   ├── models/
│   │   └── chargru_advtrain_model.keras    # CharGRU model file
│   ├── assets/
│   │   └── char_dictionary.json # Character vocabulary
│   └── tests/
│       └── ...
│
├── frontend/                    # React application
│   ├── Dockerfile               # Frontend container (multi-stage)
│   ├── nginx.conf               # Nginx SPA config
│   ├── .dockerignore
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── App.tsx              # Root component
│       ├── main.tsx             # Entry point
│       ├── index.css            # Global styles
│       ├── config/
│       │   └── api.ts           # API URL configuration
│       ├── pages/
│       │   ├── Demo.tsx         # Demo page
│       │   └── DemoPage.tsx     # Active demo page
│       └── components/
│           ├── index.ts         # Component exports
│           ├── AnalysisCard.tsx
│           ├── LoadingSkeleton.tsx
│           ├── ProbabilityGauge.tsx
│           ├── RiskBadge.tsx
│           ├── layout/
│           │   ├── MainLayout.tsx
│           │   └── SecurityAnalysisConsole.tsx
│           ├── panels/
│           │   ├── EmailContentPanel.tsx
│           │   └── AnalysisResultPanel.tsx
│           ├── analysis/
│           │   └── ...
│           ├── common/
│           │   └── PanelHeader.tsx
│           └── footer/
│               └── FooterNotice.tsx
│
└── docs/                        # Documentation
    ├── PRD.md                   # Product requirements
    ├── ARCHITECTURE.md          # System design
    ├── SETUP.md                 # Installation guide
    ├── DOCKER.md                # Docker deployment
    ├── DEPLOYMENT.md            # Deployment guide
    ├── API.md                   # API reference
    ├── DEMO_GUIDE.md            # Demo instructions
    ├── TESTING.md               # Testing guide
    └── PROJECT_STRUCTURE.md     # This file
```

## Key Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | One-command deployment |
| `backend/Dockerfile` | Backend container image |
| `frontend/Dockerfile` | Frontend container image |
| `backend/app/main.py` | FastAPI application entry |
| `backend/app/api/predict.py` | Prediction API endpoint |
| `backend/app/core/hf_distilbert_inference.py` | Active inference engine |
| `frontend/src/config/api.ts` | API URL configuration |
| `frontend/src/components/layout/SecurityAnalysisConsole.tsx` | Main UI component |
| `docs/PRD.md` | Product requirements document |

## Docker Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrates frontend + backend |
| `backend/Dockerfile` | Python 3.10 + TensorFlow + PyTorch |
| `frontend/Dockerfile` | Multi-stage: Node build → Nginx serve |
| `frontend/nginx.conf` | SPA routing configuration |
