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
            actions: [
                "drink one",
                "drink two",
                "drink three",
                "give drink",
                "drink bottle",
                "drink",
            ],
            persons: [
                "Tomas", "Juan", "Zeus"
            ],
            weightsActions: [
                1, 1, 1, 4, 1, 2
            ],
            weightsPersons: [1, 1, 1],
            add: false
        };

        this.callbackUserNavbar = this.callbackUserNavbar.bind(this);
        this.callbackNavbarIndex = this.callbackNavbarIndex.bind(this);
        this.adding = this.adding.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(id, action) {
        let i;
        if (action) {
            this.setState((prevState) => {
                let newActions = [];
                let newAWeights = [];
                for (i = 0; i < prevState.actions.length; i++) {
                    if (i !== id) {
                        newActions.push(prevState.actions[i]);
                        newAWeights.push(prevState.weightsActions[i]);
                    }
                }
                return {actions: newActions, weightsActions: newAWeights};
            })
        }
        else {
            this.setState((prevState) => {
                let newpersons = [];
                let newAWeights = [];
                for (i = 0; i < prevState.persons.length; i++) {
                    if (i !== id) {
                        newpersons.push(prevState.persons[i]);
                        newAWeights.push(prevState.weightsPersons[i]);
                    }
                }
                return {persons: newpersons, weightsPersons: newAWeights};
            })

        }
}


render()
{

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
            <Selector adding={this.adding} add={this.state.add}
                      actions={this.state.actions} persons={this.state.persons}
                      weightsActions={this.state.weightsActions} weightsPersons={this.state.weightsPersons}
                      handleClose={this.handleClose}
                      handleDelete={this.handleDelete}/>

        </div>

    );
}
}


