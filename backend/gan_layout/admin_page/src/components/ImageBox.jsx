import * as React from "react";
import * as rebo from "reactstrap";
import Dropzone from "react-dropzone";
import { observer } from "mobx-react";

@observer
export class ImageBox extends React.Component {
    constructor() {
        super();
        this.state = {
            files: []
        };
    }

    componentDidMount() {
        this.reloadImageList();
    }

    reloadImageList = () => {
        this.props.store.fetchImages();
    };

    uploadImages = () => {
        this.props.store.uploadImages(this.state.files);
    };

    onDrop = files => {
        this.setState({ files });
        console.log(this.state);
    };

    render() {
        const store = this.props.store;

        // not sure why onlick for image cannot use this.function, so must use this const function in this render function
        const imageClick = imageName => {
            store.openImageToEdit(imageName);
        };

        var imageList = store.images.map(function(image) {
            return (
                <img
                    src={image}
                    class="img-thumbnail"
                    width={100}
                    height={100}
                    onClick={() => imageClick(image)}
                />
            );
        });

        return (
            <rebo.Container>
                <rebo.Button onClick={this.reloadImageList}>Reload</rebo.Button>
                <rebo.Button onClick={this.uploadImages}>Upload</rebo.Button>
                <Dropzone onDrop={this.onDrop}>
                    <p>
                        Try dropping some files here, or click to select files
                        to upload.
                    </p>
                </Dropzone>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                        {this.state.files.map(f => (
                            <li key={f.name}>
                                {f.name} - {f.size}
                                bytes
                            </li>
                        ))}
                    </ul>
                </aside>
                {imageList}
                {store.imagesCount}
            </rebo.Container>
        );
    }
}
