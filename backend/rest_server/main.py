import os
from flask import Flask,flash, request, redirect, url_for, jsonify,send_from_directory
from flask_cors import CORS
from flask_dropzone import Dropzone
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'upload_images'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
CORS(app)
dropzone = Dropzone(app)


@app.route("/") 
def index():
    return "Hello World!"


@app.route("/images")
def getImageUrls():
    images = os.listdir(os.path.join(os.getcwd(),'upload_images'))
    images = [x for x in images if not x.startswith('.')]

    return jsonify({'images':images})


@app.route('/upload_images', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files.get('file')
        f.save(os.path.join(os.getcwd(),'upload_images', f.filename))

    return 'upload template'


@app.route('/upload_images/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run()