# Project Structure

```
phishing-detection-final/
├── README.md                    # Project overview
├── .gitignore
│
├── backend/                     # FastAPI server
│   ├── README.md
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
│       ├── test_inference.py
│       ├── test_model_load.py
│       ├── test_preprocessing.py
│       └── test_threshold_inference.py
│
├── frontend/                    # React application
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── App.tsx              # Root component
│       ├── main.tsx             # Entry point
│       ├── index.css            # Global styles
│       ├── pages/
│       │   ├── Demo.tsx         # Demo page (legacy)
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
│           │   ├── AnalysisSkeleton.tsx
│           │   ├── MetadataRow.tsx
│           │   ├── PhishingProbabilityBar.tsx
│           │   ├── ResultStatusIndicator.tsx
│           │   └── SampleResultNotice.tsx
│           ├── common/
│           │   └── PanelHeader.tsx
│           └── footer/
│               └── FooterNotice.tsx
│
└── docs/                        # Documentation
    ├── PRD.md                   # Product requirements
    ├── ARCHITECTURE.md          # System design
    ├── SETUP.md                 # Installation guide
    ├── API.md                   # API reference
    ├── DEMO_GUIDE.md            # Demo instructions
    └── PROJECT_STRUCTURE.md     # This file
```

## Key Files

| File | Purpose |
|------|---------|
| `backend/app/main.py` | FastAPI application entry point |
| `backend/app/api/predict.py` | Prediction API endpoint |
| `backend/app/core/hf_distilbert_inference.py` | Active inference engine |
| `frontend/src/components/layout/SecurityAnalysisConsole.tsx` | Main UI component |
| `docs/PRD.md` | Product requirements document |
