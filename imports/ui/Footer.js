import React, {Component} from "react";

import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-3 center-items">
                            <div className="row">
                                <h5 className="col-12">&copy; Juan Manuel Lovera & Tomas Felipe Venegas.</h5>
                            </div>
                            <div className="row">
                                <h6 className="col-12">All rights reserved.</h6>
                            </div>
                        </div>
                        <div className="col-6 center-items">
                            <img
                                className="img-fluid img-footer"
                                src="logo-min.png"
                                alt="toss-app logo"
                                onClick={this.props.goToIndex}/>
                        </div>
                        <div className="col-3 center-items fill-parent">
                            <a href="https://github.com/tf-venegas10/Toss-App" target="_blank" aria-label="Link to our github project">
                                <span className="fa-stack fa-4x">
                                    <i className="fa fa-square-o fa-stack-2x github-link"></i>
                                    <i className="fa fa-github fa-stack-1x github-link"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}