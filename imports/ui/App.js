import React, {Component} from "react";

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
            locationUser: "home"
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

        const options = [
            "drink one",
            "drink two",
            "drink three",
            "give drink",
            "drink bottle",
            "drink","drink","drink","drink","drink","drink",
        ];
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
                    <img src={"/logo.png"}/>
                    <Roulette options={options} baseSize={300} onComplete={handleOnComplete}/>
                </div>
            </div>
        );
    }
}


