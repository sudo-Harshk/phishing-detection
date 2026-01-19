from app.core.model_loader import load_chargru_model

model = load_chargru_model()
print("Model loaded successfully")
print("Number of parameters:", model.count_params())
