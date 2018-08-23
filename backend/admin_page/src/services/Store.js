import {
    observable,
    computed
} from 'mobx';
import * as axios from 'axios';

export class Store {
    baseUrl = 'http://127.0.0.1:5000';
    @observable images = [];
    @observable editImage = '';
    @observable editImageLayout = {};
    ax = axios.create({
        baseURL: this.baseUrl,
        headers: {
            'X-Custom-Header': 'foobar'
        }
    });

    constructor() {

    }

    @computed get imagesCount() {
        return this.images.length;
    }

    fetchImages = () => {
        this.ax.get('/images')
            .then((response) => {
                // console.log('fetchImages', response.data['images']);
                var _this = this;
                this.images = response.data['images'].map((image) => {
                    return _this.baseUrl + '/upload_images/' + image;
                });
            });
    }

    uploadImages = (files) => {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log('uploadImage', file);
            var formData = new FormData();
            formData.append('file', file);
            this.ax.post('upload_images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
    }

    openImageToEdit = (image) => {
        console.log(image);
        this.editImage = image;
        this.fetchImageLayoutData(image);
    }

    fetchImageLayoutData = (imageUrl) => {
        var filename = imageUrl.replace(/^.*[\\\/]/, '')
        this.ax.get('/upload_images/layout/' + filename)
            .then((response) => {
                console.log(response);
            });
    }

    uploadImageLayoutData = (imageLayout) => {

    }
}