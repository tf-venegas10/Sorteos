import React, {Component} from 'react';
import PropTypes from "prop-types"
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import Divider from 'material-ui/Divider';

import "./UserIndex.css";

export default class UserIndex extends Component {
    componentDidMount()
    {
        this.props.addSteps([{
            title: "Create new Toss-up",
            text: "To start first create a new toss-up",
            selector: "#newTossUpButton",
            type: 'hover',
            position: 'bottom',
            allowClicksThruHole: true,
            style: {
                backgroundColor: '#ccc',
                mainColor: '#000',
                header: {
                    color: '#f04',
                    fontSize: '3rem',
                    textAlign: 'center',
                },
                footer: {
                    display: 'none',
                },
                beacon: {
                    inner: '#000',
                    outer: '#000',
                },
            },
            trigger: 'div.col-3:nth-child(2) > svg:nth-child(1)'
        }]);
    }

    render() {
        let sorteos = [];
        let i = 0;

        const paperStyle = {
            width: "70%",
            backgroundColor: "#BBDBB8",
        };

        const itemStyle = {
            fontFamily: "\'Hind Madurai\', cursive",
            fontSize: "20px",
            color: "#211836",
        };

        const subHeaderStyle = {
            color: "#211836",
            fontSize: "23px",
            fontFamily: "\'Lora\', cursive",
            paddingRight: "5%",
        };

        this.props.sorteos.forEach((s)=>{
            sorteos.push(<ListItem style={itemStyle} key={i} primaryText={s.name}
                                   onClick={this.props.switchSorteo.bind(this,i)}
                                   rightIcon={<ActionDelete style={itemStyle}
                                                            onClick={this.props.handleTossDelete.bind(this, i)}/>}/>);
            i++;
        });
        if (sorteos.length===0){
            sorteos.push(<ListItem style={itemStyle} key={i++} primaryText={"Let's start by creating a new toss-up." +
            " Once you have toss-ups you'll see them here. Enter a name that characterizes your toss-up when prompted."}/>);
            sorteos.push(<button
                key={i++}
                onClick={this.props.openNew}
                className="btn btn-new">NEW TOSS-UP</button>);
        }
        return (
            <div className="row justify-content-around center-items">
                <div className="col-sm-8 col-12 center-items">
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
                            <button
                                id={"newTossUpButton"}
                                onClick={this.props.openNew}
                                className="btn btn-new">NEW TOSS-UP</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 col-12 center-items sorteos-list">
                    <MuiThemeProvider>
                        <Paper zDepth={2} rounded={false} style={paperStyle}>
                            <List>
                                <Subheader style={subHeaderStyle}>Your Toss-ups</Subheader>
                                <Divider/>
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
};
