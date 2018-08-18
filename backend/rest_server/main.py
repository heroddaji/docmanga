from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Hello World!"


@app.route("/images")
def images():
    return jsonify({'images':['dai','ococ']})


if __name__ == "__main__":
    app.run()