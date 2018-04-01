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
                    </ul>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <h1 className="slogan">Make your own toss-ups with your friends</h1>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-caption">
                                <h3>Los Angeles</h3>
                                <p>We had such a great time in LA!</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-caption">
                                <h3>Los Angeles</h3>
                                <p>We had such a great time in LA!</p>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        prev
                        <span className="carousel-control-prev-icon"/>
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next">
                        next
                        <span className="carousel-control-next-icon"/>
                    </a>
                </div>
                <div className="col-12 center-items">
                    <button
                        className="btn btn-started"
                        onClick={this.props.handleGetStarted}
                        aria-label="Getting started with an account button"
                        style={{color:"black"}}
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