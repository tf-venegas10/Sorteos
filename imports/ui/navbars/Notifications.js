import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Bell from 'material-ui/svg-icons/social/notifications';
import BellActive from 'material-ui/svg-icons/social/notifications-active';
import UserCircle from 'material-ui/svg-icons/action/account-circle';

import './OwnersActive.css';

export default class Notifications extends Component{

    constructor(props){
        super(props);
        this.state={
            verified: false
        };

        this.setVerified = this.setVerified.bind(this);
    }

    setVerified(){
        this.setState({verified:true});
    }

    render(){
        let nots = null;
        this.props.users.forEach((u)=>{
            if(u.userId === Meteor.user()._id){
                nots = u.notifications;
                return;
            }
        });
        let notifications = [];
        if(nots) {
            let i = 1;
            nots.forEach((n) => {
                notifications.push(<MenuItem
                    key={i}
                    leftIcon={<UserCircle color={"#1498D5"}/>}
                    onClick={this.setVerified}
                >{n}</MenuItem>);
                notifications.push(<Divider/>);
                i++;
            });
        }

        return(
            <IconMenu iconButtonElement={<IconButton><Bell color={"#1498D5"}/></IconButton>}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                {notifications}
            </IconMenu>
        );
    }
}