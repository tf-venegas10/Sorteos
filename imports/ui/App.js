import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";

import "./App.css";
import NavbarIndex from './navbars/NavbarIndex.js';
import NavbarUser from './navbars/NavbarUser.js';
import Index from './index/Index.js';
import LoginManager from './authentication/LoginManager.js';
import RegisterManager from "./authentication/RegisterManager.js";
import Selector from "./tabs/Selector.js";
import Footer from "./footer/Footer.js";
import {TossUps} from "../api/tossUps"
import {Meteor} from 'meteor/meteor';


import Users from '../api/users.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "index",
            newToss: false,
            sorteo: 0,
            add: false,
            inputText: "",
            inputNumb: 1,
            inputName: ""
        };

        this.goToIndex = this.goToIndex.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
        this.adding = this.adding.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onAddPerson = this.onAddPerson.bind(this);
        this.onAddAction = this.onAddAction.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleNotNew = this.handleNotNew.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.handleNewTossUp = this.handleNewTossUp.bind(this);
        this.switchSorteo = this.switchSorteo.bind(this);
    }

    goToIndex() {
        this.setState({location: "index"});
    }

    goToRegister() {
        this.setState({location: "register"});
    }

    goToLogin() {
        this.setState({location: "login"});
    }

    handleLogoutSubmit() {
        Meteor.logout();
    }

    handleNew() {
        this.setState({newToss: true});
    }

    handleNotNew() {
        this.setState({newToss: false});
    }

    handleNewTossUp() {
        this.setState({newToss: false});
        this.setState({sorteo:0});
        Meteor.call('tossUps.insert', this.state.inputName);
    }

    nameChange(e) {
        this.setState({inputName: e.target.value})
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
                if (id === -1) {
                    newActions = prevState.actions;
                    newAWeights = prevState.weightsActions;
                    newActions.pop();
                    newAWeights.pop();
                } else {
                    for (i = 0; i < prevState.actions.length; i++) {
                        if (i !== id) {
                            newActions.push(prevState.actions[i]);
                            newAWeights.push(prevState.weightsActions[i]);
                        }
                    }
                }

                return {actions: newActions, weightsActions: newAWeights};
            })
        }
        else {
            this.setState((prevState) => {
                let newpersons = [];
                let newAWeights = [];
                if (id === -1) {
                    newpersons = prevState.persons;
                    newAWeights = prevState.weightsPersons;
                    newpersons.pop();
                    newAWeights.pop();
                }
                else {
                    for (i = 0; i < prevState.persons.length; i++) {
                        if (i !== id) {
                            newpersons.push(prevState.persons[i]);
                            newAWeights.push(prevState.weightsPersons[i]);
                        }
                    }
                }
                return {persons: newpersons, weightsPersons: newAWeights};
            })

        }
    }


    onTextChange(e) {
        this.setState({inputText: e.target.value});
    }

    onNumberChange(e) {
        if (Number(e.target.value)) {
            this.setState({inputNumb: Number(e.target.value)});
        }
        else {
            this.setState({inputNumb: 0});
        }
    }

    onAddPerson() {
        /*
        this.setState((prevState) => {
            newpersons = prevState.persons;
            newAWeights = prevState.weightsPersons;
            newpersons.push(this.state.inputText);
            newAWeights.push(this.state.inputNumb);
            return {persons: newpersons, weightsPersons: newAWeights, add: false};
        });
        */
        Meteor.call('tossUps.addPerson',this.props.sorteos[this.state.sorteo].ObjectID, this.state.inputText, this.state.inputNumb);
    }

    onAddAction() {
        this.setState((prevState) => {
            let newActions = prevState.actions;
            let newAWeights = prevState.weightsActions;
            newAWeights.push(this.state.inputNumb);
            newActions.push(this.state.inputText);
            return {actions: newActions, weightsActions: newAWeights, add: false};
        });

    }
    switchSorteo(id){
        this.setState({sorteo:id});
    }

    render() {

        return (
            <div>
                <div className={this.props.currentUser ? "user-banner" : "main-banner"}>
                    <div className={this.props.currentUser ? null : "main-content center-items"}>
                        {
                            this.props.currentUser ?
                                <NavbarUser onLogoutCallback={this.handleLogoutSubmit} open={this.state.newToss}
                                            handleClose={this.handleNotNew} onTextChange={this.nameChange}
                                            handleNew={this.handleNewTossUp} openNew={this.handleNew}
                                            sorteos={this.props.sorteos} switchSorteo={this.switchSorteo}/> :
                                <NavbarIndex goToIndex={this.goToIndex}/>
                        }
                        <div className="center-items body-content">
                            {
                                this.props.currentUser ?
                                    <Selector adding={this.adding} add={this.state.add}
                                              actions={(this.props.sorteos && this.props.sorteos.length>0)?this.props.sorteos[this.state.sorteo].actions:[]}
                                              persons={(this.props.sorteos && this.props.sorteos.length>0)?this.props.sorteos[this.state.sorteo].persons:[]}
                                              weightsActions={(this.props.sorteos && this.props.sorteos.length>0)?this.props.sorteos[this.state.sorteo].weightsActions:[]}
                                              weightsPersons={(this.props.sorteos && this.props.sorteos.length>0)?this.props.sorteos[this.state.sorteo].weightsPersons:[]}
                                              handleClose={this.handleClose}
                                              handleDelete={this.handleDelete} onTextChange={this.onTextChange}
                                              onNumberChange={this.onNumberChange}
                                              onAddAction={this.onAddAction} onAddPerson={this.onAddPerson}/> :
                                    this.state.location === "index" ?
                                        <Index handleGetStarted={this.goToRegister}
                                               goToLogin={this.goToLogin}/> :
                                        this.state.location === "login" ?
                                            <LoginManager/> :
                                            <RegisterManager/>
                            }
                        </div>
                    </div>
                </div>
                <Footer goToIndex={this.goToIndex}/>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("appusers");
    Meteor.subscribe("sorteos");
    return {
        currentUser: Meteor.user(),
        sorteos: TossUps.find().fetch()
    }
})(App);


