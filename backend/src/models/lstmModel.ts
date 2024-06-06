import * as tf from "@tensorflow/tfjs-node";
import { fetchStockData } from "../services/lstmService";
import { MinMaxScaler } from "../utils/scaler";

const modelPath = "file://./saved_model/model.json";

export const predictStockPrice = async (symbol: string) => {
  const df = await fetchStockData(symbol);
  const { X, scaler } = processData(df);

  const model = await tf.loadLayersModel(modelPath);
  const predictions = model.predict(X) as tf.Tensor;
  const predictedValues = scaler.inverseTransform(
    Array.from(predictions.dataSync())
  );

  return {
    prediction: predictedValues[predictedValues.length - 1],
    historicalData: df.map((row) => row.close),
  };
};

const processData = (df: any) => {
  const scaler = new MinMaxScaler();
  const closePrices = df.map((row: any) => row.close);
  const scaledData = scaler.fitTransform(closePrices);

  const X: number[][][] = [];
  for (let i = 0; i < scaledData.length - 60 - 1; i++) {
    const segment = scaledData.slice(i, i + 60).map((value) => [value]);
    X.push(segment);
  }

  return { X: tf.tensor3d(X, [X.length, 60, 1]), scaler };
};
