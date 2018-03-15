import React, {Component} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import NavbarIndex from "../navbars/NavbarIndex"
import NavbarUser from "../navbars/NavbarUser";

import "./App.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar : "index",
            location : "index",
            locationUser : "home"
        }
    }

    render() {
        let navbar = null;

        if(this.state.navbar === "index"){
            navbar = <NavbarIndex/>;
        }
        else{
            navbar = <NavbarUser/>;
        }

        return (
            <div className="container-fluid">
                {navbar}
                <h1>La loca de Tomas</h1>
            </div>
        );
    }
}