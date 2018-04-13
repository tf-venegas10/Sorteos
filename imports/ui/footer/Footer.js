import React, {Component} from "react";

import "./Footer.css";

export default class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-6 center-items">
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
                    </div>
                </div>
            </footer>
        );
    }
}