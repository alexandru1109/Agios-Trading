from flask import Flask, render_template, request, jsonify, send_from_directory
import main  # Ensure main.predict(symbol) works as expected
import numpy as np
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    symbol = request.form['symbol']
    try:
        prediction, historical_data = main.predict(symbol)

        # Ensure all elements are JSON serializable
        prediction = float(prediction) if isinstance(prediction, np.float32) else prediction
        historical_data = historical_data.tolist() if isinstance(historical_data, np.ndarray) else historical_data

        # Save the plot
        plot_path = os.path.join('static', 'plot.png')
        plt.plot(historical_data)
        plt.title(f'{symbol} Stock Prices')
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.savefig(plot_path)
        plt.close()

        # Use the first historical price as the prediction
        first_closing_price = historical_data[0] if historical_data else None
        return jsonify({'prediction': first_closing_price, 'first_closing_price': first_closing_price})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)
