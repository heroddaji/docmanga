import * as React from 'react'
import * as rebo from 'reactstrap'
import {ImageBox} from './ImageBox'
import {ImageEditor} from './ImageEditor'

export class MainContainer extends React.Component {
    
    render() {
        console.log(this.props.store);
        
        return (
            <rebo.Container className='d-flex flex-row'>
                <rebo.Col xs='3' sm='3' md='3' lg='3'>
                    <ImageBox store={this.props.store}/>
                </rebo.Col>
                <rebo.Col xs='auto' sm='auto' md='auto' lg='auto'>
                    <ImageEditor store={this.props.store}/>
                </rebo.Col>
            </rebo.Container>
        );
    }
}