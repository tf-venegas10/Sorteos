import React, {Component} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from './CustomDialog.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavbarIndex from './navbars/NavbarIndex.js';
import NavbarUser from './navbars/NavbarUser.js';


import Roulette from "./Roulette.js";
import "./App.css";
import Selector from "./Selector";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: "index",
            location: "index",
            locationUser: "home",
            options: [
                "drink one",
                "drink two",
                "drink three",
                "give drink",
                "drink bottle",
                "drink",
            ],
            weights: [
                1, 1, 1, 4, 1, 2
            ],
            add: false
        };

        this.callbackUserNavbar = this.callbackUserNavbar.bind(this);
        this.callbackNavbarIndex = this.callbackNavbarIndex.bind(this);
        this.adding = this.adding.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOnComplete = this.handleOnComplete.bind(this);
    }

    callbackNavbarIndex(value) {
        this.setState({location: value});
    }

    callbackUserNavbar(value) {
        this.setState({locationUser: value});
    }

    adding() {
        this.setState({add: true});
    }

    handleClose() {
        this.setState({add: false});
    };

    handleOnComplete = (value) => {
        console.log(value);
    };

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
                <Selector adding={this.adding} add={this.state.add} handleOnComplete={this.handleOnComplete}
                          options={this.state.options} weights={this.state.weights} handleClose={this.handleClose}/>

            </div>

        );
    }
}


