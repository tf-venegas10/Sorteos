import React, {Component} from "react";
import PropTypes from "prop-types";

import "./Index.css";

export default class Index extends Component {
    render() {
        return (
            <div className="row justify-content-around complete-viewport center-items">
                <div id="demo" className="carousel slide" data-ride="carousel">
                    <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"/>
                        <li data-target="#demo" data-slide-to="1"/>
                        <li data-target="#demo" data-slide-to="2"/>
                        <li data-target="#demo" data-slide-to="3"/>
                        <li data-target="#demo" data-slide-to="4"/>
                    </ul>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <h1 className="slogan">Make your own toss-ups with your friends</h1>
                            <p className="content">Have fun challenging your friends or assign them tasks</p>
                        </div>
                        <div className="carousel-item">
                            <h1 className="slogan">Person Mode</h1>
                            <h3 className="subtitle">Want to select a person to do a job?</h3>
                            <p className="content">This mode challenges a random person to do any task you already
                                defined</p>
                        </div>
                        <div className="carousel-item">
                            <h1 className="slogan">Action Mode</h1>
                            <h3 className="subtitle">Actions is what you want?</h3>
                            <p className="content">This mode challenges a person to do a random action</p>
                        </div>
                        <div className="carousel-item">
                            <h1 className="slogan">Person and Action Mode</h1>
                            <h3 className="subtitle">Want to have both options?</h3>
                            <p className="content"> In this mode, you can randomly assign both an action and a person</p>
                        </div>
                        <div className="carousel-item">
                            <h1 className="slogan">Toss4All Mode</h1>
                            <h3 className="subtitle">Why not having fun in group?</h3>
                            <p className="content">This mode is made to challenge all your friends to do customized
                                actions</p>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon"/>
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon"/>
                    </a>
                </div>
                <div className="col-12 center-items">
                    <button
                        className="btn btn-started"
                        onClick={this.props.handleGetStarted}
                        aria-label="Getting started with an account button"
                    >
                        GET STARTED
                    </button>
                </div>
                <div className="col-12 center-items">
                    <a onClick={this.props.goToLogin}>
                        <h5 className="to-login">Already have an account?</h5>
                    </a>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    handleGetStarted: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
}