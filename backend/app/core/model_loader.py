from keras.models import load_model
from keras.initializers import Orthogonal
from app.config import CHARGRU_MODEL_PATH

_model = None


def load_chargru_model():
    global _model

    if _model is None:
        _model = load_model(
            CHARGRU_MODEL_PATH,
            compile=False,
            custom_objects={
                "Orthogonal": Orthogonal
            }
        )
    return _model

