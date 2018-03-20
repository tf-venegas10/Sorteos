import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tab, Tabs} from 'material-ui/Tabs';

export default class LoginManager extends Component {
    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }
    render(){
        const background = {
            backgroundColor: '#002459'
        };
        return(
            <MuiThemeProvider>
                <Tabs>
                    <Tab label="LOGIN" buttonStyle={background}>
                        <span ref="container" />;
                    </Tab>
                    <Tab label="Register" buttonStyle={background}/>
                </Tabs>
            </MuiThemeProvider>
        );
    }
}