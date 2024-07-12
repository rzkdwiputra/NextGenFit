from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend_size

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

@app.route('/recommend_size', methods=['POST'])
def get_recommendation():
    data = request.get_json()
    
    # Check if data is None
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400

    # Check if all required keys are present in the JSON payload
    if not all(key in data for key in ('weight', 'height', 'age')):
        return jsonify({"error": "Missing data: 'weight', 'height', and 'age' are required"}), 400

    weight = data['weight']
    height = data['height']
    age = data['age']

    # Panggil model rekomendasi size
    size = recommend_size(weight, height, age)

    # Balas dengan response JSON
    response = {"size": int(size)}  # Wrap size in a dictionary
    print(response)
    return jsonify(response)  # Use jsonify to return a JSON response

if __name__ == '__main__':
    app.run(debug=True)
