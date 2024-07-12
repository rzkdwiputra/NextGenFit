# # model.py
# import pickle

# # Load model from .pkl file
# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)

# def recommend_size(weight, height, age):
#     # Assuming model is a function or class method that predicts size
#     # Example usage:
#     input_data = [[weight, height, age]]
#     size = model.predict(input_data)[0]
#     return size

import pickle
import gdown

# Download the model.pkl file from Google Drive
gdown.download('https://drive.google.com/uc?id=1jlX5XttpKVOX5KbKEIQPokLv4kX5YKuD', 'model.pkl', quiet=False)

# Load model from .pkl file
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

def recommend_size(weight, height, age):
    # Assuming model is a function or class method that predicts size
    # Example usage:
    input_data = [[weight, height, age]]
    size = model.predict(input_data)[0]
    return size
