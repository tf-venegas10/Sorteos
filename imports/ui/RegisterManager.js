import React, {Component} from 'react';

import EmailPassword from "./EmailPassword.js";

import "./Auth.css"

// App component - represents the registration component

export default class RegisterManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            pswd: null,
            pswdVer: null,
            disableButton: true,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePswdChange = this.handlePswdChange.bind(this);
        this.handlePswdVerChange = this.handlePswdVerChange.bind(this);
        this.createUser = this.createUser.bind(this);
        this.verifyInput = this.verifyInput.bind(this);
    }

    handleEmailChange(val) {
        this.setState({email: val})
        this.verifyInput();
    }

    handlePswdChange(val) {
        this.setState({pswd: val})
        this.verifyInput();
    }

    handlePswdVerChange(val) {
        this.setState({pswdVer: val})
        this.verifyInput();
    }

    verifyInput() {
        let emailRegex = /^\S+@\S+(\.\S+)+$/;
        this.setState({
            disableButton: !((this.state.email && this.state.email !== "") && (this.state.pswd && this.state.pswd !== "")
            && (this.state.pswdVer && this.state.pswdVer !== "") ?
                emailRegex.test(this.state.email) && this.state.pswdVer === this.state.pswd : false)
        });
    }

    createUser(e) {
        e.preventDefault();
        Accounts.createUser({email: this.state.email, password: this.state.pswd}, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
            }
        });
    }

    render() {
        return (
            <div className="row justify-content-around center-items complete-viewport">
                <EmailPassword
                    submitAction={this.createUser}
                    typeAuth="Register"
                    onEmailChange={this.handleEmailChange}
                    onPswdChange={this.handlePswdChange}
                    onPswdVerChange={this.handlePswdVerChange}
                    disableButton={this.state.disableButton}
                />
            </div>
        );
    }
}