import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './OwnersActive.css';

/**
 * This classname is created to verify which owners are active in the tossup
 */
export default class OwnersActive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showActive: false,
        };
        this.toggleActive = this.toggleActive.bind(this);
    }

    toggleActive() {
        let isActive = this.state.showActive;
        isActive = !isActive;
        this.setState({showActive: isActive});
    }

    render() {
        const boldStyle = {
            textAlign: "center",
            fontWeight: "bold"
        };
        owners = [];
        i = 1;
        this.props.sorteo.owners.forEach((o)=>{
            this.props.users.forEach((u)=>{
                if(u.userId !== Meteor.user()._id && o === u.userId && u.online){
                    owners.push(<MenuItem primaryText={u.username} key={i}/>);
                    i++;
                    return;
                }
            });
        });

        return (
            <div>
                <MenuItem primaryText={"Active Owners ("+owners.length+")"} style={boldStyle} onClick={this.toggleActive}/>
                {
                    this.state.showActive ?
                        <div className="center-items">
                            {owners}
                        </div>
                        : null
                }
            </div>
        );
    }
}