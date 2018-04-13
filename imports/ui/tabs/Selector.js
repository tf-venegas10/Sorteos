import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TossOne from "./TossOne";
import TossPandA from "./TossPandA";
import Toss4All from "./Toss4All";
import "./Selector.css";
import Gift from 'material-ui/svg-icons/action/redeem';
import Face from 'material-ui/svg-icons/action/face';
import Action from 'material-ui/svg-icons/action/motorcycle';
import ListCheck from 'material-ui/svg-icons/av/playlist-add-check';
import {Meteor} from "meteor/meteor";


// App component - represents the whole app

export default class Selector extends Component {
    constructor(props) {
        super(props);

        this.personsActive = this.personsActive.bind(this);
        this.actionsActive = this.actionsActive.bind(this);
        this.pandasActive = this.pandasActive.bind(this);
        this.toss4allActive = this.toss4allActive.bind(this);

        this.personsActive();
    }

    personsActive() {
        Meteor.call('appusers.updateUserLocation', "person", this.props.tossData._id);
    }

    actionsActive() {
        Meteor.call('appusers.updateUserLocation', "action", this.props.tossData._id);
    }

    pandasActive() {
        Meteor.call('appusers.updateUserLocation', "panda", this.props.tossData._id);
    }

    toss4allActive() {
        Meteor.call('appusers.updateUserLocation', "toss4all", this.props.tossData._id);
    }

    render() {
        const background = {
            backgroundColor: '#1498d5',
            fontFamily: "\"Nova Slim\", sans-serif",
        };

        const ink = {
            backgroundColor: '#BBDBB8'
        };

        let usersOnPersons = 0;
        let usersOnActions = 0;
        let usersOnPandA = 0;
        let usersOnToss4All = 0;

        this.props.sorteo.owners.forEach((o) => {
            this.props.users.forEach((u) => {
                if (u.userId !== Meteor.user()._id && o === u.userId && u.online) {
                    if (this.props.tossData._id === u.currToss) {
                        if (u.currLocation === "person") {
                            usersOnPersons++;
                        }
                        else if (u.currLocation === "action") {
                            usersOnActions++;
                        }
                        else if (u.currLocation === "panda") {
                            usersOnPandA++;
                        }
                        else if (u.currLocation === "toss4all") {
                            usersOnToss4All++;
                        }
                    }
                    return;
                }
            });
        });

        return (
            <div>
                <MuiThemeProvider>
                    <Tabs inkBarStyle={ink}>
                        <Tab label={<h3>PERSON{usersOnPersons > 0 ? " ( " + usersOnPersons + " )" : null}</h3>}
                             buttonStyle={background} icon={<Face/>}
                             onActive={this.personsActive}
                        >
                            <TossOne options={this.props.persons} baseSize={250}
                                     weights={this.props.weightsPersons}
                                     add={this.props.add} handleClose={this.props.handleClose}
                                     addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                     action={false}
                                     person={true} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                     onTextChange={this.props.onTextChange}
                                     onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                     onAddPerson={this.props.onAddPerson}
                                     onAddOwner={this.props.onAddOwner}
                                     onSelection={this.props.handleSelectedTossOnePerson}
                                     selected={this.props.tossData}
                            />
                        </Tab>
                        <Tab label={<h3>ACTION{usersOnActions > 0 ? " ( " + usersOnActions + " )" : null}</h3>}
                             buttonStyle={background} icon={<Action/>}
                             onActive={this.actionsActive}
                        >
                            <TossOne options={this.props.actions} baseSize={250}
                                     weights={this.props.weightsActions}
                                     add={this.props.add} handleClose={this.props.handleClose}
                                     addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                     action={true}
                                     person={false} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                     onTextChange={this.props.onTextChange}
                                     onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                     onAddPerson={this.props.onAddPerson}
                                     onAddOwner={this.props.onAddOwner}
                                     onSelection={this.props.handleSelectedTossOneAction}
                                     selected={this.props.tossData}
                            />
                        </Tab>
                        <Tab label={<h3>PERSON & ACTION{usersOnPandA > 0 ? " ( " + usersOnPandA + " )" : null}</h3>}
                             buttonStyle={background} icon={<Gift/>}
                             onActive={this.pandasActive}
                        >
                            <TossPandA options={this.props.actions} baseSize={250}
                                       weights={this.props.weightsActions}
                                       add={this.props.add} handleClose={this.props.handleClose}
                                       addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                       action={true}
                                       person={true} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                       persons={this.props.persons} weightsPersons={this.props.weightsPersons}
                                       onTextChange={this.props.onTextChange}
                                       onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                       onAddPerson={this.props.onAddPerson}
                                       onAddOwner={this.props.onAddOwner}
                                       onSelection={this.props.handleSelectedTossPandA}
                                       selected={this.props.tossData}
                            />
                        </Tab>
                        <Tab label={<h3>ACTIONS FOR
                            ALL{usersOnToss4All > 0 ? " ( " + usersOnToss4All + " )" : null}</h3>}
                             buttonStyle={background} icon={<ListCheck/>}
                             onActive={this.toss4allActive}
                        >
                            <Toss4All options={this.props.actions} baseSize={250}
                                      weights={this.props.weightsActions}
                                      add={this.props.add} handleClose={this.props.handleClose}
                                      addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                      action={true}
                                      person={true} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                      persons={this.props.persons} weightsPersons={this.props.weightsPersons}
                                      onTextChange={this.props.onTextChange}
                                      onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                      onAddPerson={this.props.onAddPerson}
                                      onAddOwner={this.props.onAddOwner}
                                      onSelection={this.props.handleSelectedToss4All}
                                      selected={this.props.tossData}
                            />
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
            </div>
        );

    }

}