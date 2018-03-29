import React, {Component} from "react";
import PropTypes from "prop-types";

import "./Index.css";

export default class Index extends Component {
    render() {
        return (
            <div className="row justify-content-around complete-viewport center-items">
                <div className="col-12 center-items">
                    <button
                        className="btn"
                        onClick={this.props.handleGetStarted}
                        aria-label="Getting started with an account button"
                    >
                        GET STARTED
                    </button>
                </div>
                <div className="col-12 center-items">
                    <a onClick={this.props.goToLogin}>
                        <h4 className="to-login">Already have an account?</h4>
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