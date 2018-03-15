import React,  { Component }  from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./NavbarUser.css"

/**
 * This class contains all needed to display the nav bar on top.
 */
export default class NavbarIndex extends Component{

    render(){
        return(
            <nav className="navbar navbar-inverse navbar-toggleable-md fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand" onClick={this.props.onChange.bind(this,"about")}><img className="img-responsive" id="navbar_logo"
                                                                                                      src={"/resources/diet_advisor_logo.png"}
                                                                                                      alt="diet_advisor_logo" /></a>
                    <ul className="navbar-nav ml-auto">
                        <li id="home-option" className="nav-item center-items">
                            <a id="home-link" className="nav-link" onClick={this.props.onChange.bind(this,"about")}>
                                <i className="fa fa-home"></i><br/>
                                Home
                            </a>
                        </li>
                        <li id="signin-option" className="nav-item center-items">
                            <a id="signin-link" className="nav-link" onClick={this.props.onChange.bind(this,"signin")}>
                                <i className="fa fa-sign-in"></i><br/>
                                Sign Up
                            </a>
                        </li>
                        <li id="login-option" className="nav-item  center-items">
                            <a id="login-link" className="nav-link" onClick={this.props.onChange.bind(this,"login")}>
                                <i className="fa fa-user-circle"></i><br/>
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
