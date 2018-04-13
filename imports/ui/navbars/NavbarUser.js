import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import AppBar from "material-ui/AppBar";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import SignOut from "material-ui/svg-icons/action/power-settings-new"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Home from 'material-ui/svg-icons/action/home';
import LocalPlay from 'material-ui/svg-icons/maps/local-play';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import OwnersActive from "./OwnersActive.js";
import Notifications from "./Notifications.js";

import "./NavbarUser.css";

/**
 * This className contains all needed to display the nav bar on top.
 */
export default class NavbarUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTossups: false
        }
        if (Meteor.user()) {
            console.log("logged in");
            Meteor.call('appusers.online');
        }

        this.toggleTossUps = this.toggleTossUps.bind(this);
    }

    toggleTossUps() {
        let show = this.state.showTossups;
        this.setState({showTossups: !show});
    }

    render() {
        const background = {
            backgroundColor: '#424242',
            fontFamily: "'Nova Slim', cursive",
            color: "#1498D5",
            textAlign: "center"
        };

        const titleStyle = {
            textAlign: "center"
        };

        const boldStyle = {
            fontWeight: "bold"
        };
        let sorteos = [];
        let i = 0;
        this.props.sorteos.sort((s1, s2) => s2.createdAt - s1.createdAt);
        this.props.sorteos.forEach((sorteo) => {
            sorteos.push(<MenuItem
                primaryText={<div onClick={this.props.switchSorteo.bind(this, i)}>{sorteo.name}</div>}
                style={titleStyle} key={i++}
                onClick={this.props.switchSorteo.bind(this, i - 1)}
                rightIcon={<ActionDelete onClick={this.props.handleTossDelete.bind(this, i - 1)}/>}
            />)
        });
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title={this.props.userLocation === "sorteo" ?
                            <div className="row">
                                <div className="col-sm-12">{this.props.sorteo ? this.props.sorteo.name : ""}</div>
                            </div>
                            :
                            <img onClick={this.props.goToIndex} className="col-4 col-sm-2 col-md-1 appbar-logo"
                                 src="name.png" alt="Toss-App"/>
                        }
                        titleStyle={background}
                        iconElementLeft={
                            <IconMenu
                                iconButtonElement={<IconButton aria-label="Button that expands the menu"
                                ><Menu color={"#1498D5"}/></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}

                            >
                                <MenuItem style={boldStyle}
                                          leftIcon={<Home/>}
                                          onClick={this.props.goToIndex}
                                          primaryText={Meteor.user().username}/>
                                <Divider/>
                                <div>
                                    <MenuItem primaryText={"My Toss-ups (" + sorteos.length + ")"}
                                              leftIcon={<LocalPlay/>}
                                              onClick={this.toggleTossUps}
                                              style={boldStyle}/>
                                    {
                                        this.state.showTossups ? sorteos : null
                                    }
                                </div>
                                <MenuItem primaryText="New Toss-up" leftIcon={<ContentAdd/>}
                                          onClick={this.props.openNew}/>
                                {
                                    this.props.userLocation === "sorteo" ?
                                        <div>
                                            <Divider/>
                                            <OwnersActive users={this.props.users}
                                                          sorteo={this.props.sorteo}/>
                                            <MenuItem primaryText="Add Owner" leftIcon={<ContentAdd/>}
                                                      onClick={this.props.addOwner}/>
                                        </div> :
                                        null
                                }
                                <Divider/>
                                <MenuItem primaryText="Sign out" leftIcon={<SignOut/>}
                                          onClick={this.props.onLogoutCallback}/>
                            </IconMenu>
                        }
                        style={background}
                        iconElementRight={<Notifications users={this.props.users}/>}
                    />
                </MuiThemeProvider>
            </div>

        );
    }
}
