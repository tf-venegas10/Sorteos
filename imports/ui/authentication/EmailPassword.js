import React, {Component} from 'react';
import PropTypes from "prop-types";

import "./Auth.css"

// App component - represents the email and password component
// Andrés Olivares: En términos de usabilidad, sería conveniente ofrecer la posibilidad que un usuario que ha hecho click en
//                  login/registrar pueda alternar entre registrar/login en caso de haber seleccionado la opción incorrecta.
//                  Así no tendría que refrescar la página para seleccionar la opción correcta

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
            <div className="col-md-3 col-10">
                <div className={"card "+(this.props.typeAuth==="Register"?"auth-card-register":"auth-card-login")}>
                    <h2 className="auth-card-title">{this.props.typeAuth}</h2>
                    <form onSubmit={this.props.submitAction}>
                        {
                            this.props.typeAuth === "Register" ?
                                <div className={"form-group "+ (this.props.usernameError && !$("#username").is(":focus") ?
                                    "has-danger" : "")}>
                                    <label htmlFor="username">Username:</label>
                                    <input placeholder="Username" type="text" id="username"
                                           className={"form-control "+
                                           (this.props.emailError && !$("#username").is(":focus") ? "form-control-danger" : "")}
                                           onChange={this.handleUsername.bind(this)}
                                           aria-label="Text input for username"
                                    />
                                    {
                                        this.props.usernameError ?
                                            <small className="form-control-feedback">Username already exists!</small> : null
                                    }
                                </div>
                                : null
                        }
                        <div className={"form-group " + (this.props.typeAuth !== "Register" ?
                            (this.props.loginError && !$("#emailLogin").is(":focus") ? "has-danger" : "") : "") +
                        (this.props.typeAuth === "Register" ?
                            (this.props.emailError && !$("#emailRegister").is(":focus") ? "has-danger" : "") : "")}>
                            <label htmlFor="email">
                                Email:</label>
                            <input placeholder="email@example.com" type="email" id={"email" + this.props.typeAuth}
                                   className={"form-control " + (this.props.typeAuth !== "Register" ?
                                       (this.props.loginError && !$("#emailLogin").is(":focus") ? "form-control-danger" : "") : "")
                                   + (this.props.typeAuth === "Register" ?
                                       (this.props.emailError && !$("#emailRegister").is(":focus") ? "form-control-danger" : "") : "")}
                                   onChange={this.handleEmail.bind(this)}
                                   aria-label="Text input for email"
                            />
                            {
                                this.props.emailError ?
                                    <small className="form-control-feedback">Email already exists!</small> : null
                            }
                        </div>
                        <div className={"form-group " + (this.props.typeAuth !== "Register" ?
                            (this.props.loginError && !$("#passwordLogin").is(":focus") ? "has-danger" : "") : "")}>
                            <label htmlFor="Password">Password:</label>
                            <input placeholder="Password" type="password" id={"password" + this.props.typeAuth}
                                   className={"form-control " + (this.props.typeAuth !== "Register" ?
                                       (this.props.loginError && !$("#passwordLogin").is(":focus") ? "form-control-danger" : "") : "")}
                                   onChange={this.handlePswd.bind(this)}
                                   aria-label="Text input for password"
                            />

                            {
                                this.props.loginError ? <small className="form-control-feedback">Email or password are
                                    incorrect!</small> : null
                            }
                        </div>
                        {
                            this.props.typeAuth === "Register" ?
                                <div className={"form-group " + ($("#passwordVer").is(":focus") ?
                                    (this.props.match ? "has-success" : "has-danger") : "")}>
                                    <label htmlFor="password">Confirm Password:</label>
                                    <input placeholder="Password" type="password" id="passwordVer"
                                           className={"form-control " + ($("#passwordVer").is(":focus") ?
                                               (this.props.match ?
                                                   "form-control-success" : "form-control-danger") : "")}
                                           onChange={this.handlePswdVerify.bind(this)}
                                           aria-label="Text input for verifying password"
                                    />
                                    {
                                        $("#passwordVer").is(":focus") ?
                                            this.props.match ? null :
                                                <small className="form-control-feedback">Passwords must
                                                    match!</small> : null
                                    }
                                </div>
                                : null
                        }
                        <div className="form-group center-items">
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
