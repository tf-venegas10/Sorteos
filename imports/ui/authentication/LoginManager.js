import React, {Component} from 'react';
import EmailPassword from "./EmailPassword.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import "./Auth.css";

// App component - represents the login component

export default class LoginManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pswd: "",
            disableButton: true,
            processingAuth: false,
            loginError: false,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePswdChange = this.handlePswdChange.bind(this);
        this.loginWithPassword = this.loginWithPassword.bind(this);
        this.verifyInput = this.verifyInput.bind(this);
    }

    handleEmailChange(val) {
        this.setState({email: val});
        this.verifyInput();
    }

    handlePswdChange(val) {
        this.setState({pswd: val});
        this.verifyInput();
    }

    verifyInput() {
        let emailRegex = /^\S+@\S+(\.\S+)+$/;
        this.setState({
            disableButton: !((this.state.email && this.state.email !== "") && (this.state.pswd && this.state.pswd !== "") ?
                emailRegex.test(this.state.email) : false)
        });
    }

    loginWithPassword(e) {
        e.preventDefault();
        this.setState({
            processingAuth: true,
            loginError: false,
        });
        Meteor.loginWithPassword(this.state.email, this.state.pswd, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
                this.setState({
                    processingAuth: false,
                    loginError: true,
                });
            } else {
                this.setState({loginError: false})
            }
        });
    }

    render() {
        return (
            <div className="row justify-content-around">
                {
                    this.state.processingAuth ?
                        <div className="center-items">
                            <MuiThemeProvider>
                                <div className="circular-progress">
                                    <CircularProgress color={"#BBDBB8"} size={80} thickness={7}/>
                                    <h1 className="auth-text">Logging in</h1>
                                </div>
                            </MuiThemeProvider>
                        </div>
                        : < EmailPassword
                            submitAction={this.loginWithPassword}
                            typeAuth="Login"
                            onEmailChange={this.handleEmailChange}
                            onPswdChange={this.handlePswdChange}
                            disableButton={this.state.disableButton}
                            loginError={this.state.loginError}
                        />
                }
            </div>
        );
    }
}
