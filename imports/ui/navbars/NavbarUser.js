import React,  { Component }  from "react";
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
/**
 * This className contains all needed to display the nav bar on top.
 */
export default class NavbarUser extends Component{

    render(){
        return(
            <AppBar
                title="Toss-App"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementRight={<Avatar src="logo.png" />}
            />
        );
    }
}
