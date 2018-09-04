import * as React from "react";
import * as Ons from 'react-onsenui';
import * as ons from 'onsenui';


// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class MainContainer extends React.Component {
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
                Auto Layout GAN
                </div>
                <div className="right">
                <Ons.ToolbarButton>
                <Ons.Icon icon="md-menu" />
                </Ons.ToolbarButton>
                </div>
                </Ons.Toolbar>
            }
            contentStyle={{padding: 40}}
            >
            <Ons.Card>
            <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" />
            <div data-class="title">
            Awesome framework
            </div>
            <div data-class="content">
            <div>
            <Ons.Button><Ons.Icon icon="ion-thumbsup"></Ons.Icon></Ons.Button>
            <Ons.Button><Ons.Icon icon="ion-share"></Ons.Icon></Ons.Button>
            </div>
            <Ons.List>
            <Ons.ListHeader>Bindings</Ons.ListHeader>
            <Ons.ListItem>dadasa2</Ons.ListItem>
            <Ons.ListItem>Oc1235</Ons.ListItem>
            <Ons.ListItem>Dai</Ons.ListItem>
            </Ons.List>
            
            </div>
            </Ons.Card>
            
            </Ons.Page> 
        );
    }
}