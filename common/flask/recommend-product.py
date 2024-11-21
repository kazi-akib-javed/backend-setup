from flask import Flask, request, jsonify
import tensorflow as tf  # or torch if using a PyTorch model
import keras
app = Flask(__name__)

# Load the model (update path to match your downloaded files)
model = keras.layers.TFSMLayer("/Users/wasimaanjum/Downloads/kaggle_output/product-recommendation-systems", call_endpoint='serving_default')
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Process data as required by the model
    input_data = preprocess(data)  # Implement this function based on your model’s needs
    predictions = model.predict(input_data)
    result = postprocess(predictions)  # Implement this based on model output requirements
    return jsonify(result)

def preprocess(data):
    # Convert input data to a format the model expects
    return data  # adjust based on your model

def postprocess(predictions):
    # Convert model predictions to a readable format
    return predictions.tolist()  # adjust based on your model

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
