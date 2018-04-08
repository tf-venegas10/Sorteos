import React, {Component} from 'react';
import Dialog from '../adding/CustomDialog.js';
import OwnerDialog from '../adding/OwnerDialog.js';
import AddButton from "../adding/AddButton";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';

import "./Toss4All.css";

// App component - represents the random persons fit actions sorting app

export default class Toss4All extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            spin: false,
            matchParticipants: true,
            repeat: true

        };

        this.click = this.click.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onRepeatToggle = this.onRepeatToggle.bind(this);

    }


    handleRequestDelete(i, action) {
        this.props.handleDelete(i - 1, action);
    };

    onRepeatToggle() {
        this.setState((prevState) => {
            return {repeat: !prevState.repeat}
        });
    }

    click() {
        let selected = [];
        this.setState({spin: true, value: ""});
        if (this.state.matchParticipants) {
            if (this.state.repeat) {
                let arr = [];
                let i;
                let j = 0;
                this.props.weights.forEach((p) => {
                    for (i = 0; i < p; i++) {
                        arr.push(this.props.options[j]);
                    }
                    j++;
                });
                this.props.persons.forEach((person) => {
                    let x = Math.round(Math.random() * (arr.length - 1));
                    let chosenOne = arr[x];
                    selected.push({person: person, action: chosenOne});
                });
            }
            else {
                let actions = this.props.options.slice();
                this.shuffleArray(actions);
                let i = 0;
                this.props.persons.forEach((p) => {
                    selected.push({person: p, action: actions[i % actions.length]});
                    i++;
                });
            }
        }
        else {
            if (this.state.repeat) {
                let arr = [];
                let i;
                let j = 0;
                this.props.weightsPersons.forEach((p) => {
                    for (i = 0; i < p; i++) {
                        arr.push(this.props.persons[j]);
                    }
                    j++;
                });
                this.props.options.forEach((action) => {
                    let x = Math.round(Math.random() * (arr.length - 1));
                    let chosenOne = arr[x];
                    selected.push({action: action, person: chosenOne});
                });
            } else {
                let persons = this.props.persons.slice();
                this.shuffleArray(persons);
                let i = 0;
                this.props.options.forEach((p) => {
                    selected.push({action: p, person: persons[i % persons.length]});
                    i++;
                });
            }
        }
        /*this.setState((prevState) => {
            let toSel = prevState.selected;
            toSel.push(selected);
            return {selected: toSel}
        });*/
        Meteor.call("tossUps.addResult4All", this.props.selected._id, selected);

    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    onToggle() {
        this.setState((prevState) => {
            return {matchParticipants: !prevState.matchParticipants}
        });
    }


    render() {

        let opt = [];
        let persons = [];
        let i = 0;
        let totalWeight = 0;
        if (this.props.weights && this.props.weights.length > 0) {
            totalWeight = this.props.weights.reduce((a, w) => a + w);

            let totalPWeight = 0;
            if (this.props.weightsPersons && this.props.weightsPersons.length > 0) {
                totalWeight = this.props.weightsPersons.reduce((a, w) => a + w);

                this.props.options.forEach((op) => {
                        i += 1;
                        opt.push(<ListItem
                            primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalWeight * 100) + "%"}
                            key={i}
                            rightIcon={<ActionDelete onClick={this.handleRequestDelete.bind(this, i, true)}/>}/>);
                    }
                );
                i = 0;
                this.props.persons.forEach((op) => {
                        i += 1;
                        persons.push(<ListItem
                            primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalPWeight * 100) + "%"}
                            key={i}
                            rightIcon={<ActionDelete
                                onClick={this.handleRequestDelete.bind(this, i, false)}/>}/>);
                    }
                );
            }
        }
        i = 0;
        let results = [];
        if (this.props.selected.results4All) {
            this.props.selected.results4All.forEach((sorted) => {

                    sorted.forEach((op) => {
                        i += 1;
                        results.push(<ListItem primaryText={op.person + ": " + op.action} key={i}/>);
                    });
                    i++;
                    results.push(<Divider key={i}/>);

                }
            );
        }
        const ink = {
            color: '#149bda'
        };
        const paperInk = {
            backgroundColor: "#BBDBB8",
        };
        let finalItem = results.pop();
        i = 0;
        let res = [];
        if (this.props.selected.results4All && this.props.selected.results4All.length > 0) {
            this.props.selected.results4All[this.props.selected.results4All.length - 1].forEach((op) => {
                i += 1;
                res.push(<ListItem primaryText={op.person + ": " + op.action} key={i}/>);
            });
        }
        res.push(finalItem);
        while (i > 0) {
            i--;
            results.pop();
        }
        results.push(finalItem);


        return (
            <div>
                <div className="container-fluid row toss-content">
                    <div className="col-3"></div>
                    <div className="col-2">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={paperInk}>
                                <MuiThemeProvider>
                                    <Toggle
                                        style={{color: "white"}}
                                        label="Match Participants"
                                        onToggle={this.onToggle}
                                        toggled={this.state.matchParticipants}
                                    />
                                </MuiThemeProvider>
                                <MuiThemeProvider>
                                    <Toggle
                                        style={{color: "white"}}
                                        label="Match Actions"
                                        onToggle={this.onToggle}
                                        toggled={!this.state.matchParticipants}
                                    />
                                </MuiThemeProvider>

                                <MuiThemeProvider>
                                    <Toggle
                                        style={{color: "white"}}
                                        label="Repeat"
                                        onToggle={this.onRepeatToggle}
                                        toggled={this.state.repeat}
                                    />
                                </MuiThemeProvider>
                            </Paper>
                            <MuiThemeProvider>
                                <RaisedButton label="Spin" style={ink} disabledBackgroundColor="true"
                                              onClick={this.click} aria-label="Boton girar Ruleta"/>
                            </MuiThemeProvider>
                        </MuiThemeProvider>
                    </div>
                </div>
                <div className="container-fluid row">
                    <div className="col-sm-2 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={paperInk}>
                                <List>
                                    <ListItem><h5>History</h5></ListItem>
                                    <Divider/>
                                    {results}
                                </List>
                            </Paper>
                        </MuiThemeProvider>

                    </div>

                    <div className="col-sm-4 col-6">
                        <div className="roulette-container">

                            <MuiThemeProvider>
                                <Paper zDepth={2} rounded={false} style={paperInk}>
                                    <List>
                                        {res}
                                    </List>
                                    <Divider/>
                                </Paper>
                            </MuiThemeProvider>
                        </div>

                    </div>
                    <div className="col-sm-2 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={paperInk}>
                                <h1 className="head-title">Actions</h1>
                                <Divider/>
                                <List>
                                    {opt}
                                </List>
                            </Paper>
                        </MuiThemeProvider>

                    </div>
                    <div className="col-sm-2 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={paperInk}>
                                <h1 className="head-title">Persons</h1>
                                <Divider/>
                                <List>
                                    {persons}
                                </List>
                            </Paper>
                        </MuiThemeProvider>
                        <div className="row justify-content-center">
                            <div className="col-11"></div>
                            <div className="col-2">
                                <AddButton adding={this.props.adding}/>
                            </div>
                        </div>
                    </div>


                </div>

                <OwnerDialog open={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                             onTextChange={this.props.onTextChange} onAddOwner={this.props.onAddOwner}/>
            </div>

        );


    }
}