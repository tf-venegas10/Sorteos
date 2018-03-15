import React, {Component} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import NavbarIndex from "../navbars/NavbarIndex"
import NavbarUser from "../navbars/NavbarUser";

import "./App.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: "index",
            location: "index",
            locationUser: "home"
        }

        this.callbackUserNavbar = this.callbackUserNavbar.bind(this);
        this.callbackUserNavbar = this.callbackUserNavbar;
    }

    callbackNavbarIndex(value) {
        this.setState({location: value});
    }

    callbackUserNavbar(value) {
        this.setState({locationUser: value});
    }

    render() {
        let navbar = null;

        if (this.state.navbar === "index") {
            navbar = <NavbarIndex onChange={this.callbackNavbarIndex}/>;
        }
        else {
            navbar = <NavbarUser onChange={this.callbackUserNavbar}/>;
        }

        return (
            <div>
                {navbar}
                <div className="container-fluid">
                    <h1>Tomas puta</h1>
                </div>
            </div>
        );
    }
}