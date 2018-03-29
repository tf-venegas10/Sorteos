import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import EmailPassword from "./EmailPassword.js";

import {Users} from "../../api/users.js";
import "./Auth.css"

// App component - represents the registration component

export default class RegisterManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            pswd: null,
            pswdVer: null,
            disableButton: true,
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePswdChange = this.handlePswdChange.bind(this);
        this.handlePswdVerChange = this.handlePswdVerChange.bind(this);
        this.createUser = this.createUser.bind(this);
        this.verifyInput = this.verifyInput.bind(this);
    }

    handleUsernameChange(val) {
        this.setState({username: val});
        this.verifyInput();
    }

    handleEmailChange(val) {
        this.setState({email: val});
        this.verifyInput();
    }

    handlePswdChange(val) {
        this.setState({pswd: val});
        this.verifyInput();
    }

    handlePswdVerChange(val) {
        this.setState({pswdVer: val});
        this.verifyInput();
        this.setState({disableButton: ((this.state.pswd === this.state.pswdVer) && this.state.disableButton)});
    }

    verifyInput() {
        let emailRegex = /^\S+@\S+(\.\S+)+$/;
        this.setState({
            disableButton: !((this.state.username && this.state.username !== "") && (this.state.email && this.state.email !== "")
            && (this.state.pswd && this.state.pswd !== "") && (this.state.pswdVer && this.state.pswdVer !== "") ?
                emailRegex.test(this.state.email) : false)
        });
    }

    createUser(e) {
        e.preventDefault();
        Accounts.createUser({
            email: this.state.email,
            password: this.state.pswd,
            username: this.state.username
        }, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
            }else{
                Meteor.call('appusers.insert',true);
            }
        });
    }

    render() {
        return (
            <div className="row justify-content-around center-items complete-viewport">
                <EmailPassword
                    submitAction={this.createUser}
                    typeAuth="Register"
                    onUsernameChange={this.handleUsernameChange}
                    onEmailChange={this.handleEmailChange}
                    onPswdChange={this.handlePswdChange}
                    onPswdVerChange={this.handlePswdVerChange}
                    disableButton={this.state.disableButton}
                />
            </div>
        );
    }
}