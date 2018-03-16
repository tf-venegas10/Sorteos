import React, {Component} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import NavbarIndex from "../navbars/NavbarIndex"
import NavbarUser from "../navbars/NavbarUser";
import Roulette from "./Roulette.js";
import "./App.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: "index",
            location: "index",
            locationUser: "home",
            oprions:[
                "drink one",
                "drink two",
                "drink three",
                "give drink",
                "drink bottle",
                "drink","drink","drink","drink","drink","drink",
            ]
        };

        this.callbackUserNavbar = this.callbackUserNavbar.bind(this);
        this.callbackNavbarIndex = this.callbackNavbarIndex.bind(this);
    }

    callbackNavbarIndex(value) {
        this.setState({location: value});
    }

    callbackUserNavbar(value) {
        this.setState({locationUser: value});
    }



    render() {
        const handleOnComplete = (value) => {
            console.log(value);
        };

        let navbar = null;
        

        if (this.state.navbar === "index") {
            navbar = <NavbarIndex onChange={this.callbackNavbarIndex}/>;
        }
        else {
            navbar = <NavbarUser onChange={this.callbackUserNavbar}/>;
        }
        if (this.state.location=== "new"){

        }

        return (
            <div>
                {navbar}
                <div className="container-fluid">
                    <img src={"/logo.png"}/>
                    <Roulette options={this.state.options} baseSize={300} onComplete={handleOnComplete}/>
                </div>
            </div>
        );
    }
}


