import React, {Component} from 'react';
import PropTypes from "prop-types";

import "./Auth.css"

// App component - represents the email and password component

export default class EmailPassword extends Component {

    handleUsername(e) {
        this.props.onUsernameChange($("#username").val());
    }

    handleEmail(e) {
        this.props.onEmailChange($("#email" + this.props.typeAuth).val());
    }

    handlePswd(e) {
        this.props.onPswdChange($("#password" + this.props.typeAuth).val());
    }

    handlePswdVerify(e) {
        this.props.onPswdVerChange($("#passwordVer").val());
    }

    render() {
        return (
            <div className="col-sm-3 col-10">
                <div className="card auth-card">
                    <h2 className="auth-card-title">{this.props.typeAuth}</h2>
                    <form onSubmit={this.props.submitAction}>
                        {
                            this.props.typeAuth === "Register" ?
                                <div className="form-group">
                                    <label htmlFor="username">Username:
                                    <input placeholder="Username" type="text" id="username"
                                           className="form-control"
                                           onChange={this.handleUsername.bind(this)}
                                           aria-label="Text input for username"
                                    /></label>
                                </div>
                                : null
                        }
                        <div className="form-group">
                            <label htmlFor="email">Email:
                            <input placeholder="email@example.com" type="email" id={"email" + this.props.typeAuth}
                                   className="form-control"
                                   onChange={this.handleEmail.bind(this)}
                                   aria-label="Text input for email"
                            />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password:
                            <input placeholder="Password" type="password" id={"password" + this.props.typeAuth}
                                   className="form-control"
                                   onChange={this.handlePswd.bind(this)}
                                   aria-label="Text input for password"
                            />
                            </label>
                        </div>
                        {
                            this.props.typeAuth === "Register" ?
                                <div className={"form-group " + ($("#passwordVer").is(":focus") ?
                                    (this.props.match? "has-success" : "has-danger"):"")}>
                                    <label htmlFor="password">Confirm Password:</label>
                                    <input placeholder="Password" type="password" id="passwordVer"
                                           className={"form-control " + ( $("#passwordVer").is(":focus") ?
                                               (this.props.match?
                                               "form-control-success" : "form-control-danger"):"")}
                                           onChange={this.handlePswdVerify.bind(this)}
                                           aria-label="Text input for verifying password"
                                    />
                                    {
                                         $("#passwordVer").is(":focus") ?
                                             this.props.match? null :
                                            <small className="form-control-feedback">Passwords must match!</small>:null
                                    }
                                </div>
                                : null
                        }
                        <div className="form-group">
                            <button type="submit"
                                    className="btn auth-button"
                                    disabled={this.props.disableButton}
                                    aria-label={this.props.typeAuth + " button"}>
                                {this.props.typeAuth}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

EmailPassword.propTypes = {
    submitAction: PropTypes.func.isRequired,
    typeAuth: PropTypes.string.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPswdChange: PropTypes.func.isRequired,
    disableButton: PropTypes.bool.isRequired,
};