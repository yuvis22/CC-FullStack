from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import hashlib
import logging
import time
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

def predict_fraud(amount, transaction_type, merchant_category, card_type, transaction_location, customer_age):
    """
    Predict fraud based on transaction features:
    - amount: Transaction amount
    - transaction_type: Type of transaction (online/in-store/atm/international)
    - merchant_category: Category of merchant
    - card_type: Type of card (credit/debit/prepaid)
    - transaction_location: Location of transaction (domestic/international/online)
    - customer_age: Age of the customer
    """
    # Create a deterministic hash based on input features
    input_str = f"{amount}_{transaction_type}_{merchant_category}_{card_type}_{transaction_location}_{customer_age}"
    hash_value = int(hashlib.md5(input_str.encode()).hexdigest(), 16)
    
    # Base fraud probability
    base_prob = 0.1
    
    # Adjust probability based on amount
    if amount > 1000:
        base_prob += 0.2
    elif amount > 500:
        base_prob += 0.1
    
    # Adjust based on transaction type
    if transaction_type.lower() == 'online':
        base_prob += 0.15
    elif transaction_type.lower() == 'international':
        base_prob += 0.2
    elif transaction_type.lower() == 'atm':
        base_prob += 0.1
    
    # Adjust based on card type
    if card_type.lower() == 'prepaid':
        base_prob += 0.15
    elif card_type.lower() == 'debit':
        base_prob += 0.05
    
    # Adjust based on transaction location
    if transaction_location.lower() == 'international':
        base_prob += 0.15
    elif transaction_location.lower() == 'online':
        base_prob += 0.1
    
    # Adjust based on customer age
    try:
        age = int(customer_age)
        if age < 25 or age > 75:
            base_prob += 0.1
    except ValueError:
        pass
    
    # Adjust based on merchant category
    high_risk_categories = ['electronics', 'travel', 'entertainment']
    if merchant_category.lower() in high_risk_categories:
        base_prob += 0.1
    
    # Use hash to add some randomness while keeping it consistent for same inputs
    hash_factor = (hash_value % 100) / 1000
    final_prob = min(0.99, base_prob + hash_factor)
    
    # Determine if it's fraud based on probability threshold
    is_fraud = final_prob > 0.5
    
    return is_fraud, final_prob

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        logger.info(f"Received data: {data}")
        
        # Extract the features
        amount = float(data.get('amount', 0))
        transaction_type = data.get('transaction_type', 'in-store')
        merchant_category = data.get('merchant_category', 'retail')
        card_type = data.get('card_type', 'credit')
        transaction_location = data.get('transaction_location', 'domestic')
        customer_age = data.get('customer_age', '30')
        
        # Simulate model processing time
        time.sleep(0.5)  # Increased to show loading animation
        
        # Get prediction
        is_fraud, probability = predict_fraud(
            amount, 
            transaction_type, 
            merchant_category,
            card_type,
            transaction_location,
            customer_age
        )
        
        # Create probability array [legitimate_prob, fraud_prob]
        if is_fraud:
            probability_array = [1 - probability, probability]
        else:
            probability_array = [probability, 1 - probability]
        
        logger.info(f"Prediction: {is_fraud}, Probability: {probability_array}")
        
        return jsonify({
            'prediction': 1 if is_fraud else 0,
            'probability': probability_array,
            'threshold': 0.5,
            'confidence_score': probability
        })
        
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 