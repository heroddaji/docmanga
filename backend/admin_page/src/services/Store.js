import {observable, computed} from "mobx";
import * as axios from "axios";

export class Store {
    @observable _images = [];

    constructor() {
        this.images = ['a', 'b']
        this.ax = axios.create({
            baseURL: 'http://127.0.0.1:5000/',
            timeout: 1000,
            headers: {
                'X-Custom-Header': 'foobar'
            }
        });
    }

    @computed get images() {
        return this._images;
    }

    fetchImages = () => {
        this
            .ax
            .get('/images')
            .then((response) => {
                console.log('hehe', response.data['images']);
                // this._images = response.data['images'];
            });
    }
}
