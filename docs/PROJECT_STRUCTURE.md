# Project Structure

```
phishing-detection-final/
├── README.md
├── docker-compose.yml
├── .gitignore
│
├── backend/
│   ├── README.md
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env                              # API keys (not committed)
│   ├── requirements.txt
│   └── app/
│       ├── main.py                       # FastAPI app, CORS, router
│       ├── config.py                     # Paths, constants, loads .env
│       ├── api/
│       │   └── predict.py                # POST /api/predict — routes email vs URL
│       ├── core/
│       │   ├── hf_distilbert_inference.py  # Email analysis via DistilBERT (active)
│       │   ├── virustotal.py               # URL analysis via VirusTotal API v3
│       │   ├── inference.py                # CharGRU inference (alternative)
│       │   ├── model_loader.py             # Lazy Keras model loader
│       │   └── preprocessing.py            # Email HTML stripping & normalisation
│       └── utils/
│           └── logger.py
│   ├── models/
│   │   └── chargru_advtrain_model.keras  # CharGRU model weights
│   ├── assets/
│   │   ├── char_dictionary.json          # 95-symbol character vocabulary
│   │   └── example_emails/
│   │       ├── clean_1.txt
│   │       └── phishing_1.txt
│   └── tests/
│       ├── test_inference.py
│       ├── test_model_load.py
│       ├── test_preprocessing.py
│       └── test_threshold_inference.py
│
├── frontend/
│   ├── Dockerfile                        # Multi-stage: Node build → Nginx serve
│   ├── nginx.conf                        # SPA routing config
│   ├── .dockerignore
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── App.tsx                       # Routes: / and /analyze
│       ├── main.tsx
│       ├── index.css
│       ├── config/
│       │   └── api.ts                    # Backend URL (VITE_API_URL env var)
│       ├── lib/
│       │   ├── utils.ts                  # cn() Tailwind helper
│       │   └── urlMetadata.ts            # URL parsing, normalisation, heuristics
│       ├── pages/
│       │   ├── LandingPage.tsx           # Home / overview page
│       │   └── DemoPage.tsx              # /analyze — mounts SecurityAnalysisConsole
│       └── components/
│           ├── NeuralNetworkAnimatedBeam.tsx  # Landing page animation
│           ├── ui/
│           │   └── animated-beam.tsx         # Animated connector primitive
│           ├── layout/
│           │   ├── MainLayout.tsx            # Two-column grid
│           │   └── SecurityAnalysisConsole.tsx  # Root: tabs, state, API calls
│           ├── panels/
│           │   ├── EmailContentPanel.tsx     # Email textarea + buttons
│           │   ├── UrlLinkPanel.tsx          # URL input + buttons
│           │   └── AnalysisResultPanel.tsx   # Result states (loading/error/result)
│           ├── analysis/
│           │   ├── UrlIntelCard.tsx          # Unified URL card (structure + domain)
│           │   ├── DomainIntelBlock.tsx      # DomainInfo type definition
│           │   ├── LinkMetadataBlock.tsx     # (legacy — superseded by UrlIntelCard)
│           │   ├── ResultStatusIndicator.tsx # Risk badge, mode-aware copy
│           │   ├── PhishingProbabilityBar.tsx  # Probability bar, mode-aware label
│           │   ├── AnalysisSkeleton.tsx      # Loading skeleton, mode-aware text
│           │   └── MetadataRow.tsx           # Footer: label + latency
│           ├── common/
│           │   └── PanelHeader.tsx
│           └── footer/
│               └── FooterNotice.tsx
│
└── docs/
    ├── API.md                            # API reference
    ├── ARCHITECTURE.md                   # System design & data flows
    ├── PROJECT_STRUCTURE.md              # This file
    ├── SETUP.md                          # Local development setup
    ├── DOCKER.md                         # Docker deployment
    ├── DEPLOYMENT.md                     # Production deployment
    ├── TESTING.md                        # Testing guide
    ├── DEMO_GUIDE.md                     # Demo walkthrough
    └── PRD.md                            # Product requirements
```

---

## Key Files

| File | Purpose |
|------|---------|
| `backend/.env` | `VIRUSTOTAL_API_KEY` — required for URL analysis |
| `backend/app/api/predict.py` | Single endpoint; auto-detects URL vs email |
| `backend/app/core/virustotal.py` | VirusTotal submit + domain fetch (concurrent) |
| `backend/app/core/hf_distilbert_inference.py` | Active email inference engine |
| `frontend/src/components/layout/SecurityAnalysisConsole.tsx` | Root UI component |
| `frontend/src/components/analysis/UrlIntelCard.tsx` | URL intel card (structure + domain) |
| `frontend/src/lib/urlMetadata.ts` | Client-side URL parsing and heuristics |
| `frontend/src/config/api.ts` | Backend base URL configuration |

## Docker Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrates frontend + backend containers |
| `backend/Dockerfile` | Python 3.12 + ML dependencies |
| `frontend/Dockerfile` | Node build stage → Nginx serve stage |
| `frontend/nginx.conf` | Serves SPA, proxies `/api` to backend |
