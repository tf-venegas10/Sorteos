import React, {Component} from 'react';
import PropTypes from "prop-types"
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';

import "./UserIndex.css";

export default class UserIndex extends Component {

    render() {
        let sorteos = [];
        let i = 0;
        this.props.sorteos.forEach((s)=>{
            sorteos.push(<ListItem key={i} primaryText={s.name}/>);
            i++;
        });

        const paperStyle = {
            width: "70%",
        };

        return (
            <div className="row justify-content-around center-items">
                <div className="col-8 center-items">
                    <div className="card welcome-card">
                        <img className="card-img-top welcome-image" src="./resources/welcome.jpg" alt="welcome image"/>
                        <div className="card-body">
                            <h4 className="card-title">Welcome to Toss-App!</h4>
                            <h5 className="card-subtitle">We are pleased to have you here.</h5>
                            <p>This is your dashboard were you can get informed about new features, content and much
                                more.
                                Also you can explore and manage your toss-ups. If you haven't made any toss-ups, give it
                                a
                                try right now!</p>
                            <button className="btn btn-new">NEW TOSS-UP</button>
                        </div>
                    </div>
                </div>
                <div className="col-3 center-items sorteos-list">
                    <MuiThemeProvider>
                        <Paper zDepth={2} rounded={false} style={paperStyle}>
                            <List>
                                <Subheader>Your Toss-ups</Subheader>
                                {sorteos}
                            </List>
                        </Paper>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

UserIndex.propTypes = {
    sorteos: PropTypes.array.isRequired,
}
