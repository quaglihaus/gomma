from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from Scripts import calculate_hourly_mean



app = Flask(__name__, static_folder='build/static', template_folder='build')
CORS(app)

@app.route("/")
def main():
    return render_template('index.html')


@app.route("/hourlymean/<path:fromtime>/<path:totime>", methods=['GET'])
def hourlymean(fromtime, totime):
    df_hourly_averaged_metrics = calculate_hourly_mean(fromtime, totime)
    df_hourly_averaged_metrics = df_hourly_averaged_metrics.to_json(orient="split")
    print(df_hourly_averaged_metrics)
    return {'status':'success', "dataframe":df_hourly_averaged_metrics}

if __name__ == '__main__':
    print("Run application")
    app.run(port=3010, debug=True)