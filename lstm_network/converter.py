import tensorflowjs as tfjs
import tensorflow as tf

# Load the Keras model
model = tf.keras.models.load_model('./saved_model.h5')

# Save the model in TensorFlow.js format
tfjs.converters.save_keras_model(model, './tfjs_model')
