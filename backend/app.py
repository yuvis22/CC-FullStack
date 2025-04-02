from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
try:
    model = joblib.load('model.joblib')
    scaler = joblib.load('scaler.joblib')
    logger.info("Model and scaler loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None
    scaler = None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        logger.info(f"Received data: {data}")
        
        # Extract features in the correct order
        features = [
            float(data['amount']),
            float(data['time']),
            float(data['v1']),
            float(data['v2']),
            float(data['v3']),
            float(data['v4']),
            float(data['v5']),
            float(data['v6']),
            float(data['v7']),
            float(data['v8']),
            float(data['v9']),
            float(data['v10']),
            float(data['v11']),
            float(data['v12']),
            float(data['v13']),
            float(data['v14']),
            float(data['v15']),
            float(data['v16']),
            float(data['v17']),
            float(data['v18']),
            float(data['v19']),
            float(data['v20']),
            float(data['v21']),
            float(data['v22']),
            float(data['v23']),
            float(data['v24']),
            float(data['v25']),
            float(data['v26']),
            float(data['v27']),
            float(data['v28'])
        ]
        
        # Reshape features for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Scale features
        features_scaled = scaler.transform(features_array)
        
        # Get prediction and probability
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0]
        
        logger.info(f"Prediction: {prediction}, Probability: {probability}")
        
        return jsonify({
            'prediction': int(prediction),
            'probability': probability.tolist()
        })
        
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 