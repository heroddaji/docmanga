import os
from flask import Flask,flash, request, redirect, url_for, jsonify,send_from_directory
from flask_cors import CORS
from flask_dropzone import Dropzone
import json
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
    images = [x for x in images if not x.startswith('.') and (x.endswith('.png') or x.endswith('.jpg'))]

    return jsonify({'images':images})


@app.route('/upload_images', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        f = request.files.get('file')
        f.save(os.path.join(os.getcwd(),'upload_images', f.filename))

    return 'upload template'


@app.route('/upload_images/<filename>')
def get_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/upload_images/layout/<filename>', methods=['GET'])
def get_image_layout(filename):
    name_no_extension = os.path.splitext(os.path.basename(filename))[0]
    fullpath = os.path.join(os.getcwd(),'upload_images', name_no_extension + '.json')
    file_json = '{}'
    if os.path.exists(fullpath):
        with open(fullpath, 'r') as f:
            file_json = json.load(f)
    else:
        with open(fullpath,'w') as f:
            f.write('{}')

    return jsonify(file_json)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run()