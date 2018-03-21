import React,  { Component }  from "react";
import AppBar from "material-ui/AppBar";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import SignOut from "material-ui/svg-icons/action/power-settings-new"
import {white} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * This className contains all needed to display the nav bar on top.
 */
export default class NavbarUser extends Component{

    render(){
        const background={
            backgroundColor: 'rgb(55,55,55)'
        };
        const titleStyle={
            textAlign: "center"
        };
        return(
            <MuiThemeProvider>
                <AppBar
                    title={<img className="col-4 col-sm-2 col-md-1" src="name.png"/>}
                    iconElementLeft={
                        <IconMenu
                            iconButtonElement={<IconButton><Menu color={white}/></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem primaryText="Sign out" leftIcon={<SignOut/>} onClick={this.props.onLogoutCallback}/>
                        </IconMenu>
                    }
                    style={background}
                    titleStyle={titleStyle}
                />
            </MuiThemeProvider>
        );
    }
}
