from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import keras
import os


app = Flask(__name__)

output_class = ["batteries", "clothes", "e-waste", "glass", "light blubs", "metal", "organic", "paper", "plastic"]


def waste_prediction(new_image):
  new_model = keras.models.load_model('./model/waste.h5')
  test_image = image.load_img(new_image, target_size = (224,224))
 
  test_image = image.img_to_array(test_image) / 255
  test_image = np.expand_dims(test_image, axis=0)

  predicted_array = new_model.predict(test_image)
  predicted_value = output_class[np.argmax(predicted_array)]
  predicted_accuracy = round(np.max(predicted_array) * 100, 2)
  return predicted_value, predicted_accuracy

@app.route('/predict_waste', methods=['POST'])
def predict_waste():
    if 'img' not in request.files:
        return jsonify({'error': 'No image found in request'})

    try : 
        img_file = request.files['img']

        # Get the file extension from the filename
        _, file_extension = os.path.splitext(img_file.filename)
        img_path = './images/temp_img{}'.format(file_extension)  # Temporarily save the image

        img_file.save(img_path)

        predicted_value, predicted_accuracy = waste_prediction(img_path)

        # Delete the temporarily saved image
        os.remove(img_path)

        response = {
            'predicted_waste': predicted_value,
            'accuracy': predicted_accuracy
        }

        return jsonify(response)
    
    except() : 
        return jsonify({'error': 'An Error occurred' , status : 500})



if __name__ == '__main__':
   app.run()