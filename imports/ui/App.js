import React, {Component} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from './CustomDialog.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavbarIndex from './navbars/NavbarIndex.js';
import NavbarUser from './navbars/NavbarUser.js';


import Roulette from "./Roulette.js";
import "./App.css";

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
                "drink", "drink", "drink", "drink", "drink", "drink",
            ],
            add: false
        };

        this.callbackUserNavbar = this.callbackUserNavbar.bind(this);
        this.callbackNavbarIndex = this.callbackNavbarIndex.bind(this);
        this.adding = this.adding.bind(this);
        this.handleClose = this.handleClose.bind(this);

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


        return (
            <div>
                {navbar}
                <div className="row">
                    <div className="col-11"></div>
                    <div className="col-1">
                        <MuiThemeProvider>
                            <FloatingActionButton onClick={this.adding}>
                                <ContentAdd/>
                            </FloatingActionButton>
                        </MuiThemeProvider>
                    </div>
                </div>
                <div className="container-fluid row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <Roulette className="col-10" options={this.state.options} baseSize={300}
                                  onComplete={handleOnComplete}/>
                    </div>

                    <div className="col-1"></div>


                </div>
                <Dialog open={this.state.add} handleClose={this.handleClose}/>

            </div>

        );
    }
}


