import * as React from "react";
import * as Ons from 'react-onsenui';
import * as ons from 'onsenui';

export interface MainContainerProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class MainContainer extends React.Component<MainContainerProps, {}> {
    handleClick = function() {
        ons.notification.alert('Hello dai du');
    };
    
    render() {
        return (
            <Ons.Page
            renderFixed={() => <div>   </div>
                //  <Ons.Fab></Ons.Fab>
            }
            renderToolbar={() => 
                <Ons.Toolbar>
                    <div className="left">
                        <Ons.BackButton>
                            Back
                        </Ons.BackButton>
                    </div>
                    <div className="center">
                        Title
                    </div>
                    <div className="right">
                        <Ons.ToolbarButton>
                            <Ons.Icon icon="md-menu" />
                        </Ons.ToolbarButton>
                    </div>
                </Ons.Toolbar>
            }
            contentStyle={{padding: 40}}>
            <div> Page content </div>
            </Ons.Page> 
        );
    }
}