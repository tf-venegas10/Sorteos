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
import Snackbar from 'material-ui/Snackbar';


// App component - represents the random person sorting app

export default class TossPandA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            spin: false,
            value: "",
            chosenOne: null
        };
        this.handleRouletteSpin = this.handleRouletteSpin.bind(this);
        this.onSpin = this.onSpin.bind(this);
        this.click = this.click.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
    }

    handleRouletteSpin(value) {
        this.setState((prevState) => {
            let actions = prevState.selected;
            actions.push({person: prevState.chosenOne, action: value});
            return ({selected: actions, value: value});
        })

    };

    //TODO: handle request delete
    handleRequestDelete(i, action) {
        this.props.handleDelete(i - 1, action);
    };

    click() {
        this.setState({spin: true, value: ""});
    }

    onSpin(callback) {
        //let's choose the lucky person
        let arr=[];
        let i;
        let j=0;
        this.props.weightsPersons.forEach((p)=>{
           for(i=0; i<p; i++){
               arr.push(this.props.persons[j]);
           }
           j++;
        });
        let x = Math.round(Math.random() * (arr.length-1));
        let chosenOne = arr[x];
        this.setState({spin: false, value: "", chosenOne: chosenOne},
            callback);
    }

    render() {

        let opt = [];
        let persons = [];
        let i = 0;
        let totalWeight= this.props.weights.reduce((a,w)=>a+w);
        let totalPWeight= this.props.weightsPersons.reduce((a,w)=>a+w);
        this.props.options.forEach((op) => {
                i += 1;
                opt.push(<ListItem primaryText={op +" :"+Math.round(this.props.weights[i-1]/totalWeight*100)+"%"} key={i}
                                   rightIcon={<ActionDelete onClick={this.handleRequestDelete.bind(this, i, true)}/>}/>);
            }
        );
        i=0;
        this.props.persons.forEach((op) => {
                i += 1;
                persons.push(<ListItem primaryText={op+" :"+Math.round(this.props.weights[i-1]/totalPWeight*100)+"%"} key={i}
                                       rightIcon={<ActionDelete
                                           onClick={this.handleRequestDelete.bind(this, i, false)}/>}/>);
            }
        );
        i = 0;
        let results = [];
        this.state.selected.forEach((op) => {
                i += 1;
                results.push(<ListItem primaryText={op.person + ": " + op.action} key={i}/>);
            }
        );
        const ink = {
            backgroundColor: '#149bda'
        };

        return (
            <div>
                <div className="row">
                    <div className="col-11"></div>
                    <div className="col-1">
                        <AddButton adding={this.props.adding}/>
                    </div>
                </div>
                <div className="container-fluid row">

                    <div className="col-sm-8 col-12">
                        <div className="roulette-container">
                            <MuiThemeProvider>
                                <RaisedButton label="Spin" style={ink} onClick={this.click}/>
                            </MuiThemeProvider>
                        </div>
                        <Roulette options={this.props.options} baseSize={250} spin={this.state.spin}
                                  onSpin={this.onSpin}
                                  onComplete={this.handleRouletteSpin} weights={this.props.weights}/>
                    </div>
                    <div className="col-sm-2 col-6">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false}>
                                <List>
                                    {opt}
                                </List>
                                <Divider/>
                                <List>
                                    {results}
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
                        onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction} onAddPerson={this.props.onAddPerson}/>
                <MuiThemeProvider>
                    <Snackbar
                        open={this.state.value !== ""}
                        message={this.state.chosenOne + ": " + this.state.value}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                        bodyStyle={{ height: 200, width: 200, flexGrow: 0 }}
                        contentStyle={{ fontSize:30}}
                    />
                </MuiThemeProvider>
            </div>

        );


    }
}