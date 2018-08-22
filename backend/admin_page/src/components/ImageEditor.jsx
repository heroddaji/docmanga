import * as React from 'react';
import * as rebo from 'reactstrap';
import * as m from '../models/Model';
import {observer} from 'mobx-react';
import * as p from 'react-paper-bindings';
import '../css/ImageEditor.css';

// Define the graph dimensions and margins
const width = 800;
const height = 800;

@observer
export class ImageEditor extends React.Component {
    segment = 0
    path = 0
    movePath=0
    hitOptions = {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 20
    };
    constructor(props) {
        super(props); 
        this.state = {
            doubleClickLoc:[],
            dragStartLoc:[],
            dragEndLoc:[],
            shapes:[]
        }
        this.paperView = React.createRef();
        
    }
    
    handleDoubleClick = (evt) => {
        console.log(evt);        
        let e = evt.target;
        let dim = e.getBoundingClientRect();
        let x = evt.clientX - dim.left;
        let y = evt.clientY - dim.top;
        this.setState({doubleClickLoc:[x,y]})        
        let shape = new m.LayoutModel();
        shape.x = x;
        shape.y = y;
        this.setState({
            shapes:[...this.state.shapes, shape]
        })
    }

    handleMouseDown = (event) => {
        console.log('mouse down');
        
        const pa = this.paperView.current;
        const project = pa.paper.project;        
        this.segment = this.path = null;
        var hitResult = project.hitTest(event.point, this.hitOptions);
        if (!hitResult)
            return;

        if (hitResult) {
            this.path = hitResult.item;
            if (hitResult.type == 'segment') {
                this.segment = hitResult.segment;
                console.log('segment');
                
            } else if (hitResult.type == 'stroke') {
                console.log('stroke');
                var location = hitResult.location;
                this.segment = this.path.insert(location.index + 1, event.point);
                this.path.smooth();
            }
        }
        this.movePath = hitResult.type == 'fill';
        if (this.movePath) {
            project.activeLayer.addChild(hitResult.item);
        }
    }

    handleMouseDrag = (event) => {
        let item = event.target;
        if (this.segment) {
            this.segment.position = event.point;
            console.log('on segment', this.segment.position);
            this.segment.point = event.point;
        } else if (this.path) {
            item.position = event.point;
        }
    }

    handleMouseMove = (event) => {
        const pa = this.paperView.current;
        const project = pa.paper.project;        
        project.activeLayer.selected = false;
        if (event.target) {
            event.target.selected = true;
        }        
    }

    componentDidMount() {
        const pa = this.paperView.current;
        const paper = pa.paper;
        paper.settings.handleSize = 12;
    }
    
    render() {
        const store = this.props.store;                                
        return (     
            <div id='canvasEditor'>                
                <p.View ref={this.paperView} width={width} height={height}                 
                onDoubleClick={this.handleDoubleClick}                    
                >
                    <p.Raster></p.Raster>
                    { this.state.shapes.map(shape => {
                        return (
                            <p.Rectangle                
                                onMouseDrag={this.handleMouseDrag}                
                                onMouseMove={this.handleMouseMove}
                                onMouseDown={this.handleMouseDown}
                                point={[shape.x,shape.y]}
                                fillColor={'#22222'}
                                opacity={0.5}
                                size={[shape.width, shape.height]}
                                
                            /> 
                        )})}               
                </p.View>
            </div>       
        );
    }
}