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
import Checkbox from 'material-ui/Checkbox';

import "./Toss4All.css";
import ActionHelp from 'material-ui/svg-icons/action/help-outline';

// App component - represents the random persons fit actions sorting app

export default class Toss4All extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            spin: false,
            matchParticipants: true,
            repeat: true,

        };

        this.click = this.click.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onRepeatToggle = this.onRepeatToggle.bind(this);
        this.help = this.help.bind(this);
        this.handleCheck = this.handleCheck.bind(this);


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
                    selected.push({person: person, action: chosenOne , checked:false});
                });
            }
            else {
                let actions = this.props.options.slice();
                this.shuffleArray(actions);
                let i = 0;
                this.props.persons.forEach((p) => {
                    selected.push({person: p, action: actions[i % actions.length], checked:false});
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
                    selected.push({action: action, person: chosenOne,  checked:false});
                });
            } else {
                let persons = this.props.persons.slice();
                this.shuffleArray(persons);
                let i = 0;
                this.props.options.forEach((p) => {
                    selected.push({action: p, person: persons[i % persons.length], checked:false });
                    i++;
                });
            }
        }

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

    help() {
        this.setState((prevState) => {
            return {help: !prevState.help}
        });
    }
    handleCheck(i){
        Meteor.call("tossUps.checkItem", this.props.selected._id, i);
    }


    render() {
        const alertInk = {
            backgroundColor: "#D73A6F"
        };

        let opt = [];
        let persons = [];
        let i = 0;
        let totalWeight = 0;
        let listStyle = {
            fontFamily: "\"Hind Madurai\",sans-serif",
            color: "#211836",
        };
        if (this.props.weights && this.props.weights.length > 0) {
            totalWeight = this.props.weights.reduce((a, w) => a + w);

            let totalPWeight = 0;
            if (this.props.weightsPersons && this.props.weightsPersons.length > 0) {
                totalPWeight = this.props.weightsPersons.reduce((a, w) => a + w);

                this.props.options.forEach((op) => {
                        i += 1;
                        opt.push(<ListItem
                            primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalWeight * 100) + "%"}
                            key={i}
                            style={listStyle}
                            rightIcon={<ActionDelete onClick={this.handleRequestDelete.bind(this, i, true)}/>}/>);
                    }
                );
                i = 0;
                this.props.persons.forEach((op) => {
                        i += 1;
                        persons.push(<ListItem
                            primaryText={op + " :" + Math.round(this.props.weightsPersons[i - 1] / totalPWeight * 100) + "%"}
                            key={i}
                            style={listStyle}
                            rightIcon={<ActionDelete
                                onClick={this.handleRequestDelete.bind(this, i, false)}/>}/>);
                    }
                );
            }
        }
        i = 0;
        let results = [];


        /*
        if (this.props.selected && this.props.selected.results4All) {
            this.props.selected.results4All.reverse();
            this.props.selected.results4All.forEach((sorted) => {

                    sorted.forEach((op) => {
                        i += 1;
                        results.push(<ListItem
                            style={i == this.props.selected.results4All.length ? firstItem : listStyle}
                            primaryText={op.person + ": " + op.action} key={i}/>);
                    });
                    i++;
                    results.push(<Divider key={i}/>);

                }
            );
        }*/
        const ink = {
            color: '#149bda'
        };
        const paperInk = {
            backgroundColor: "#BBDBB8",
        };
        const listInkChecked={
            textDecoration: "line-through",
            backgroundColor: "#f1e8e1"
        };
        const listInk={

            backgroundColor: "#f1e8e1"
        };
        const image={
            backgroundImage: "resources/paper.jpg",
        };
        //let finalItem = results.pop();
        i = 0;
        let res = [];
        if (this.props.selected && this.props.selected.results4All && this.props.selected.results4All.length > 0) {
            this.props.selected.results4All[0].forEach((op) => {
                i += 1;
                res.push(<ListItem
                    style={op.checked?listInkChecked:listInk} primaryText={op.person + ": " + op.action} rightIcon ={<MuiThemeProvider><Checkbox checked={op.checked} onCheck={this.handleCheck.bind(this,i-1)}/></MuiThemeProvider>} key={i}/>);
            });
        }
        //res.push(finalItem);
        res.reverse();
        while (i > 0) {
            i--;
            results.pop();
        }
        //results.push(finalItem);
        instructions = null;
        if (this.props.options.length === 0 || this.props.persons.length === 0) {

            instructions = (
                <Paper style={alertInk} zDepth={5}><p>This tab allows you to select one action for each participant or
                    the contrary.</p>
                    <p>For this to work correctly you'll need to add both actions and participants.</p></Paper>);

        }
        let Help = [];
        i = 0;
        if (this.state.help) {
            Help = (<MuiThemeProvider>
                <Paper style={paperInk} zDepth={5}>
                    <p><strong>Match participants</strong> means that the toss-up will return one action for each
                        participant. If you check <strong>repeat</strong> the actions will be assigned according to
                        their weight, repetition allowed.</p>
                    <p><strong>Match actions</strong> means that each action (to do) will get exactly one participant
                        even if it means repeating participants or not showing them all.
                    </p>
                    <p>Checking <strong>repeat</strong> means participants will be assigned according to their weight,
                        repetition allowed. </p>
                </Paper>
            </MuiThemeProvider>);
        }


        const listScroll = {
            overflowY: opt.length > 5 ? "scroll" : "auto",
            height: "12em",
        };

        return (
            <div>
                <div className="container-fluid row toss-content">
                    {instructions}

                    <div className="col-sm-6 col-12">
                        <MuiThemeProvider>
                            <RaisedButton label="New Assignment" style={ink} disabledBackgroundColor="true"
                                          onClick={this.click} aria-label="Boton girar Ruleta"/>
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={image}>
                                <h1 className="head-title">Results</h1>
                                <Divider/>
                                <List style={listScroll}>
                                    {res}
                                </List>

                            </Paper>
                        </MuiThemeProvider>
                    </div>
                    <div className="col-sm-6 col-12 row">
                    <div className="col-sm-4 col-6">

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
                                <ActionHelp onClick={this.help}/>
                                {Help}
                            </Paper>
                        </MuiThemeProvider>

                    </div>
                    <div className="col-sm-4 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={paperInk}>
                                <h1 className="head-title">Actions</h1>
                                <Divider/>
                                <List style={listScroll}>
                                    {opt}
                                </List>
                            </Paper>
                        </MuiThemeProvider>
                    </div>
                    <div className="col-sm-4 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={paperInk}>
                                <div className="row justify-content-center">
                                    <div className="col-1"></div>
                                    <h1 className="head-title col-7">Persons</h1>
                                    <div className="col-4">
                                        <AddButton adding={this.props.adding}/>
                                    </div>
                                </div>
                                <Divider/>
                                <List style={listScroll}>
                                    {persons}
                                </List>
                            </Paper>
                        </MuiThemeProvider>
                    </div>
                    </div>
                    <OwnerDialog open={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                 onTextChange={this.props.onTextChange} onAddOwner={this.props.onAddOwner}/>
                </div>
            </div>

        );


    }
}