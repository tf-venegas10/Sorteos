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
        this.handleTossDelete = this.handleTossDelete.bind(this);
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
        this.setState({sorteo: 0});
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

            let newActions = [];
            let newAWeights = [];
            if (id === -1) {
                newActions = this.props.sorteos[this.state.sorteo].actions;
                newAWeights = this.props.sorteos[this.state.sorteo].weightsActions;
                newActions.pop();
                newAWeights.pop();
            } else {
                for (i = 0; i < this.props.sorteos[this.state.sorteo].actions.length; i++) {
                    if (i !== id) {
                        newActions.push(this.props.sorteos[this.state.sorteo].actions[i]);
                        newAWeights.push(this.props.sorteos[this.state.sorteo].weightsActions[i]);
                    }
                }
            }
            Meteor.call("tossUps.switchActions", this.props.sorteos[this.state.sorteo]._id, newActions, newAWeights);

        }
        else {

            let newpersons = [];
            let newAWeights = [];
            if (id === -1) {
                newpersons = this.props.sorteos[this.state.sorteo].persons;
                newAWeights = this.props.sorteos[this.state.sorteo].weightsPersons;
                newpersons.pop();
                newAWeights.pop();
            }
            else {
                for (i = 0; i < this.props.sorteos[this.state.sorteo].persons.length; i++) {
                    if (i !== id) {
                        newpersons.push(this.props.sorteos[this.state.sorteo].persons[i]);
                        newAWeights.push(this.props.sorteos[this.state.sorteo].weightsPersons[i]);
                    }
                }
            }
            Meteor.call("tossUps.switchPersons", this.props.sorteos[this.state.sorteo]._id, newpersons, newAWeights);

        }
    }
    handleTossDelete(id){
        let idd=this.props.sorteos[id]._id;
        Meteor.call('tossUps.deleteMyOwnership',idd);
        this.switchSorteo(0);
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
        Meteor.call('tossUps.addPerson', this.props.sorteos[this.state.sorteo]._id, this.state.inputText, this.state.inputNumb);
        this.setState({add: false});
    }

    onAddAction() {
        Meteor.call('tossUps.addAction', this.props.sorteos[this.state.sorteo]._id, this.state.inputText, this.state.inputNumb);
        this.setState({add: false});

    }

    switchSorteo(id) {
        this.setState({sorteo: id});
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
                                            sorteos={this.props.sorteos} switchSorteo={this.switchSorteo}
                                            handleTossDelete={this.handleTossDelete}/> :
                                <NavbarIndex goToIndex={this.goToIndex}/>
                        }
                        <div className="center-items body-content">
                            {
                                this.props.currentUser ?
                                    <Selector adding={this.adding} add={this.state.add}
                                              actions={(this.props.sorteos && this.props.sorteos.length > 0) ? this.props.sorteos[this.state.sorteo].actions : []}
                                              persons={(this.props.sorteos && this.props.sorteos.length > 0) ? this.props.sorteos[this.state.sorteo].persons : []}
                                              weightsActions={(this.props.sorteos && this.props.sorteos.length > 0) ? this.props.sorteos[this.state.sorteo].weightsActions : []}
                                              weightsPersons={(this.props.sorteos && this.props.sorteos.length > 0) ? this.props.sorteos[this.state.sorteo].weightsPersons : []}
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


