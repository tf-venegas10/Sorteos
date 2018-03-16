import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Roulette from "./Roulette.js";
import "./App.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: "index",
            location: "index",
            locationUser: "home",
            oprions: [
                "drink one",
                "drink two",
                "drink three",
                "give drink",
                "drink bottle",
                "drink", "drink", "drink", "drink", "drink", "drink",
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

        /*
        if (this.state.navbar === "index") {
            navbar = <NavbarIndex onChange={this.callbackNavbarIndex}/>;
        }
        else {
            navbar = <NavbarUser onChange={this.callbackUserNavbar}/>;
        }*/
        if (this.state.location === "new") {

        }

        return (
            <div>
            <MuiThemeProvider>
                <AppBar
                    title={<img className="col-4 col-sm-2 col-md-1" src="name.png"/>}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
            </MuiThemeProvider>
                <div className="container-fluid">
                    <Roulette options={this.state.options} baseSize={300} onComplete={handleOnComplete}/>

                </div>
            </div>

        );
    }
}


