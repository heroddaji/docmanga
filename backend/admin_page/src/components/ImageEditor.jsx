import * as React from 'react';
import * as rebo from 'reactstrap';
import {observer} from 'mobx-react';

@observer
export class ImageEditor extends React.Component {
    constructor() {
        super();   
    }

    render() {
        const store = this.props.store;
        
        return (
            <rebo.Container>
                <img src={store.editImage} width='auto'/>
            </rebo.Container>
        );
    }
}