import * as React from 'react'
import * as rebo from 'reactstrap'
import {ImageBox} from './ImageBox'

export class MainContainer extends React.Component {
        
    render() {
        console.log(this.props.store);
        
        return (
            <rebo.Container>
                <rebo.Row>
                    <rebo.Col sx={'3'}>
                        <ImageBox store={this.props.store}/>
                    </rebo.Col>
                    <rebo.Col sx={'auto'}>
                        <rebo.Card>hehe</rebo.Card>
                    </rebo.Col>
                </rebo.Row>
            </rebo.Container>

        );
    }
}