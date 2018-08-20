import * as React from 'react';
import {observer} from 'mobx-react';

import { Bar } from '@vx/shape';
import {Drag} from '@vx/drag';
import {localPoint} from '@vx/event';


// Define the graph dimensions and margins
const width = 800;
const height = 800;

@observer
export class ImageEditor extends React.Component {
    
    constructor() {
        super(); 
        this.state = {
            doubleClickLoc:[],
            dragStartLoc:[],
            dragEndLoc:[],
        }
        
    }
    
    handleDoubleClick = (evt) => {
        console.log(evt);        
        var e = evt.target;
        var dim = e.getBoundingClientRect();
        var x = evt.clientX - dim.left;
        var y = evt.clientY - dim.top;
        this.setState({doubleClickLoc:[x,y]})
    }
    
    render() {
        const store = this.props.store;                
        console.log(this.state.dragStartLoc, this.state.dragEndLoc);
        let startx = 0;
        let starty = 0;
        let endx = 0;
        let endy = 0
        // console.log(startx, starty, endx, endy);
        
        return (
            <svg width={width} height={height}
            onDoubleClick={this.handleDoubleClick}
            >
            <Drag width={width} height={height} resetOnStart={true}
                onDragStart={({x, y}) =>  {
                    console.log('drag start',x,y);
                    
                    this.setState((state,props) => {
                        const dragStartLoc = [x,y];
                        state.dragStartLoc = dragStartLoc                    
                    });
                }}

                onDragMove={({ x, y, dx, dy }) => {                    
                    this.setState((state, props) => {
                        const dragEndLoc = [x + dx, y + dy];                        
                        state.dragEndLoc = dragEndLoc;                        
                        console.log('drag move',x+dx,y+dy);
                        console.log('drag move state',state.dragEndLoc);

                        startx = this.state.dragStartLoc[0] <= this.state.dragEndLoc[0] ? this.state.dragStartLoc[0] : this.state.dragEndLoc[0];
                        starty = this.state.dragStartLoc[1] <= this.state.dragEndLoc[1] ? this.state.dragStartLoc[1] : this.state.dragEndLoc[1];
                        endx = this.state.dragStartLoc[0] > this.state.dragEndLoc[0] ? this.state.dragStartLoc[0] : this.state.dragEndLoc[0];
                        endy = this.state.dragStartLoc[1] > this.state.dragEndLoc[1] ? this.state.dragStartLoc[1] : this.state.dragEndLoc[1];        
                    });
                    
                }} 

                onDragEnd={({x, y}) =>  {
                    console.log('drag end',this.state.dragEndLoc);
                    
                    // this.setState((state,props) => {
                    //     const dragStartLoc = [x,y];
                    //     state.dragStartLoc = dragStartLoc                    
                    // });
                }}
            >

                {({
                x,
                y,
                dx,
                dy,
                isDragging,
                dragStart,
                dragEnd,
                dragMove,
                }) => {
                    // console.log('is dragging', isDragging);
                    
                return (
                    <g>
                    {/* decorate the currently drawing line */}
                    {isDragging && (
                        <g>
                        <rect
                            fill="red"
                            width={8}
                            height={8}
                            x={x + dx - 4}
                            y={y + dy - 4}
                            style={{ pointerEvents: 'none' }}
                        />
                        <circle
                            cx={x}
                            cy={y}
                            r={4}
                            fill="transparent"
                            stroke="blue"
                            style={{ pointerEvents: 'none' }}
                        />

                        
                        <rect
                            fill="transparent" 
                            stroke="green"                           
                            x={startx}
                            y={starty}                            
                            width={endx - startx}
                            height={ endy - starty}
                            style={{ pointerEvents: 'none' }}
                        />
                        </g>
                    )}
                    {/* create the drawing area */}
                    <rect
                        fill="transparent"
                        stroke="black"
                        width={width}
                        height={height}
                        onMouseDown={dragStart}
                        onMouseUp={dragEnd}
                        onMouseMove={dragMove}
                        onTouchStart={dragStart}
                        onTouchEnd={dragEnd}
                        onTouchMove={dragMove}
                    />
                    </g>
                );
                }}

            </Drag>
            
            <Bar
            width={100}
            height={50}
            x={this.state.doubleClickLoc[0]}
            y={this.state.doubleClickLoc[1]}
            fill="steelblue"
            stroke={'red'}
            strokeWidth={3}
            />
            </svg>
        );
    }
}