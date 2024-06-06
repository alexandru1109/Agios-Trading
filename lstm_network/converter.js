const tf = require('@tensorflow/tfjs-node');
const path = require('path');

async function loadModel() {
  try {
    const modelPath = path.resolve(__dirname, './tfjs_model/model.json');
    console.log(`Loading model from path: ${modelPath}`);
    const model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log('Model loaded successfully');
  } catch (err) {
    console.error('Error during loading:', err);
  }
}

loadModel();
