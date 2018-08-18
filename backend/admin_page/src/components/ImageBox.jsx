import * as React from 'react';
import * as rebo from 'reactstrap';
import {observer} from "mobx-react";

export class ImageBox extends React.Component {
    onReload = () => {
        this
            .props
            .store
            .fetchImages()
    }

    render() {
        const store = this.props.store;
        var imageList = store
            .images
            .map(function (image) {
                return (
                    <rebo.Card>{image}</rebo.Card>
                )
            })

        return (
            <rebo.Container>
                <rebo.Button onClick={this.onReload}>Reload</rebo.Button>
                {imageList}
            </rebo.Container>
        );
    }
}