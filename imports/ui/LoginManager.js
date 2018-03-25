import React, {Component} from 'react';

import EmailPassword from "./EmailPassword.js";

export default class LoginManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            pswd: "",
            disableButton: true,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePswdChange = this.handlePswdChange.bind(this);
        this.loginWithPassword = this.loginWithPassword.bind(this);
        this.verifyInput = this.verifyInput.bind(this);
    }

    handleEmailChange(val){
        this.setState({email:val})
        this.verifyInput();
    }

    handlePswdChange(val){
        this.setState({pswd:val})
        this.verifyInput();
    }

    verifyInput(){
        let emailRegex = /^\S+@\S+(\.\S+)+$/;
        this.setState({
            disableButton: !(this.state.email||this.state.email!=="")&&(this.state.pswd&&this.state.email!=="")?
                emailRegex.test(this.state.email) : false
        });
    }

    loginWithPassword(e){
        e.preventDefault();
        Meteor.loginWithPassword(this.state.email, this.state.pswd, (error)=>{
           if(error){
               console.log("Error: "+error.reason);
           }
        });
    }

    render() {
        return (
            <div className="row justify-content-around">
                <EmailPassword
                    submitAction={this.loginWithPassword}
                    typeAuth="Login"
                    onEmailChange={this.handleEmailChange}
                    onPswdChange={this.handlePswdChange}
                    disableButton={this.state.disableButton}
                />
            </div>
        );
    }
}
