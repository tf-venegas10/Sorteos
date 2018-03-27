import React,  { Component }  from "react";
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import "./NavbarIndex.css";

/**
 * This className contains all needed to display the nav bar on top.
 */
export default class NavbarIndex extends Component{

    render(){
        const background={
            backgroundColor: '#373737'
        };
        const titleStyle={
          textAlign: "center"
        };
        return(
            <MuiThemeProvider>
                <AppBar
                    title={<img onClick={this.props.goToIndex}
                                className="col-4 col-sm-2 col-md-1 logo-image"
                                src="name.png" alt="Toss-App"/>}
                    style={background}
                    titleStyle={titleStyle}
                    showMenuIconButton={false}
                />
            </MuiThemeProvider>
        );
    }
}
