from fastapi import FastAPI, HTTPException
import numpy as np
import tensorflow as tf
import pickle
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  
)

# Load the trained ANN model
try:
    model = tf.keras.models.load_model("app/artifacts/Asteroid_Impact_Model.h5")
    print("✅ Model loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None  

# Load StandardScaler from pickle file
try:
    with open("app/artifacts/scaler.pkl", "rb") as scaler_file:
        scaler = pickle.load(scaler_file)
    print("✅ StandardScaler loaded successfully.")
except Exception as e:
    print(f"❌ Error loading scaler: {e}")
    scaler = None  

# Define input data schema
class AsteroidData(BaseModel):
    orbit_axis: float  
    eccentricity: float  
    inclination: float  
    perihelion_distance: float  
    aphelion_distance: float  
    min_orbit_intersection_distance: float  
    mean_anomaly: float  
    perihelion_argument: float  
    node_longitude: float  
    orbital_period: float  

@app.post("/predict_impact")
def predict_impact(data: AsteroidData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded. Please check server logs.")
    
    if scaler is None:
        raise HTTPException(status_code=500, detail="Scaler is not loaded. Please check server logs.")

    try:
        # Convert input to NumPy array
        input_data = np.array([[
            data.orbit_axis, 
            data.eccentricity, 
            data.inclination, 
            data.perihelion_distance, 
            data.aphelion_distance, 
            data.min_orbit_intersection_distance, 
            data.mean_anomaly, 
            data.perihelion_argument, 
            data.node_longitude, 
            data.orbital_period 
        ]], dtype=np.float32)


        scaled_input = scaler.transform(input_data)

        # Make prediction
        prediction = model.predict(scaled_input)[0][0]  
        impact_risk = int(prediction > 0.5)  # Convert to binary (0 or 1)

        return {
            "impact_risk": impact_risk,
            "prediction_probability": round(float(prediction), 4)  
        }

    except Exception as e:
        print(f"❌ Error in prediction: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
