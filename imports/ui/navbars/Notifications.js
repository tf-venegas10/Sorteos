import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Bell from 'material-ui/svg-icons/social/notifications';
import {white} from 'material-ui/styles/colors';

import './OwnersActive.css';

export default class Notifications extends Component{

    render(){
        return(
            <IconMenu iconButtonElement={<IconButton><Bell color={white}/></IconButton>}
                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
            </IconMenu>
        );
    }
}