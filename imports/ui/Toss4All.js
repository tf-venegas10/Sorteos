import React, {Component} from 'react';
import Roulette from "./Roulette.js";
import Dialog from './CustomDialog.js';
import AddButton from "./AddButton";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';

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
        this.setState((prevState) => {
            let toSel = prevState.selected;
            toSel.push(selected);
            return {selected: toSel}
        });
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
        let totalWeight = this.props.weights.reduce((a, w) => a + w);
        let totalPWeight = this.props.weightsPersons.reduce((a, w) => a + w);
        this.props.options.forEach((op) => {
                i += 1;
                opt.push(<ListItem primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalWeight * 100) + "%"}
                                   key={i}
                                   rightIcon={<ActionDelete onClick={this.handleRequestDelete.bind(this, i, true)}/>}/>);
            }
        );
        i = 0;
        this.props.persons.forEach((op) => {
                i += 1;
                persons.push(<ListItem
                    primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalPWeight * 100) + "%"} key={i}
                    rightIcon={<ActionDelete
                        onClick={this.handleRequestDelete.bind(this, i, false)}/>}/>);
            }
        );
        i = 0;
        let results = [];
        this.state.selected.forEach((sorted) => {

                sorted.forEach((op) => {
                    i += 1;
                    results.push(<ListItem primaryText={op.person + ": " + op.action} key={i}/>);
                });
                i++;
                results.push(<Divider key={i}/>);

            }
        );
        const ink = {
            color: '#149bda'
        };
        let finalItem = results.pop();
        i = 0;
        let res = [];
        if(this.state.selected.length>0) {
            this.state.selected[this.state.selected.length - 1].forEach((op) => {
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
                <div className="row">

                    <div className="col-3"></div>
                    <div className="col-2">
                        <MuiThemeProvider>
                            <Toggle
                                label="Match Participantes"
                                onToggle={this.onToggle}
                                toggled={this.state.matchParticipants}
                            />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <Toggle
                                label="Match Acciones"
                                onToggle={this.onToggle}
                                toggled={!this.state.matchParticipants}
                            />
                        </MuiThemeProvider>

                        <MuiThemeProvider>
                            <Toggle
                                label="Repetir"
                                onToggle={this.onRepeatToggle}
                                toggled={this.state.repeat}
                            />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <RaisedButton label="Spin" style={ink} disabledBackgroundColor="true"
                                          onClick={this.click}/>
                        </MuiThemeProvider>

                    </div>
                    <div className="col-6"></div>
                    <div className="col-1">
                        <AddButton adding={this.props.adding}/>
                    </div>
                </div>
                <div className="container-fluid row">
                    <div className="col-sm-2 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false}>
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
                                <Paper zDepth={2} rounded={false}>
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
                            <Paper zDepth={2} rounded={false}>
                                <List>
                                    {opt}
                                </List>
                            </Paper>
                        </MuiThemeProvider>

                    </div>
                    <div className="col-sm-2 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false}>
                                <List>
                                    {persons}
                                </List>
                                <Divider/>
                            </Paper>
                        </MuiThemeProvider>

                    </div>


                </div>
                <Dialog open={this.props.add} handleClose={this.props.handleClose} action={this.props.action}
                        person={this.props.person} onTextChange={this.props.onTextChange}
                        onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                        onAddPerson={this.props.onAddPerson}/>
            </div>

        );


    }
}