import React, {Component} from 'react';
import Roulette from "../roulette/Roulette.js";
import OwnerDialog from '../adding/OwnerDialog.js';
import AddButton from "../adding/AddButton";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import "./TossPandA.css";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({

    palette: {
        primary1Color: "#149CDB",
        primary2Color: "#304057",
        accent1Color: "#FF8E0B",
        textColor: "#424242",
    }
});
// App component - represents the random person sorting app

export default class TossPandA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            spin: false,
            value: "",
            chosenOne: null,
            onMe:false
        };
        this.handleRouletteSpin = this.handleRouletteSpin.bind(this);
        this.onSpin = this.onSpin.bind(this);
        this.click = this.click.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
    }


    handleRouletteSpin(value,startAngle) {
        if(this.state.onMe) {
            Meteor.call("tossUps.addResultPandAs", this.props.selected._id, {person: this.props.selected.chosenOne, action: value});
            Meteor.call("tossUps.spinPandAs", this.props.selected._id, this.props.selected.spinTimeAction,false, startAngle, this.props.selected.chosenOne);
            this.setState({onMe:false});
        }

        this.setState({value: value});
        setTimeout(()=>{
            this.setState({value: ""});
            },1000);


    };

    handleRequestDelete(i, action) {
        this.props.handleDelete(i - 1, action);
    };

    click() {
        let spinTimeTotal = Math.random()*30/2*35.9+ 3*30/2*35.9;
        this.setState({onMe:true});


        let arr = [];
        let i;
        let j = 0;
        this.props.weightsPersons.forEach((p) => {
            for (i = 0; i < p; i++) {
                arr.push(this.props.persons[j]);
            }
            j++;
        });
        let x = Math.round(Math.random() * (arr.length - 1));
        let chosenOne = arr[x];
        Meteor.call("tossUps.spinPandAs", this.props.selected._id, spinTimeTotal,true,0,chosenOne);

    }

    onSpin(callback) {
        //let's choose the lucky person
        Meteor.call("tossUps.spinPandAs", this.props.selected._id, this.props.selected.spinTimePandAs,false,0, this.props.selected.chosenOne,callback);
    }


    render() {
        const alertInk = {
            backgroundColor: "#FF8E0B"
        };
        let opt = [];
        let persons = [];
        let i = 0;
        let totalWeight = 0;
        let listStyle = {
            fontFamily: "\"Hind Madurai\",sans-serif",
            color: "#304057",
        };
        if (this.props.weights && this.props.weights.length > 0) {
            totalWeight = this.props.weights.reduce((a, w) => a + w);

            let totalPWeight = 0;
            if (this.props.weightsPersons && this.props.weightsPersons.length > 0) {
                totalPWeight = this.props.weightsPersons.reduce((a, w) => a + w);

                this.props.options.forEach((op) => {
                        i += 1;
                        opt.push(<ListItem
                            style={listStyle}
                            primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalWeight * 100) + "%"}
                            key={i}
                            rightIcon={<ActionDelete onClick={this.handleRequestDelete.bind(this, i, true)}/>}/>);
                    }
                );
                i = 0;
                this.props.persons.forEach((op) => {
                        i += 1;
                        persons.push(<ListItem
                            style={listStyle}
                            primaryText={op + " :" + Math.round(this.props.weightsPersons[i - 1] / totalPWeight * 100) + "%"}
                            key={i}
                            rightIcon={<ActionDelete
                                onClick={this.handleRequestDelete.bind(this, i, false)}/>}/>);
                    }
                );
            }
        }
        i = 0;
        let results = [];

        let firstItem = {
            backgroundColor: "#DCDCDC",
            fontFamily: "\"Hind Madurai\",sans-serif",
            color: "#424242",
        };

            if (this.props.selected && this.props.selected.resultsPandAs) {

            this.props.selected.resultsPandAs.forEach((op) => {
                    i += 1;
                    results.push(<ListItem
                        style={i===this.props.selected.resultsPandAs.length?firstItem:listStyle}
                        primaryText={op.person + ": " + op.action} key={i}/>);
                }
            );
        }
        results.reverse();
        const ink = {
            backgroundColor: '#149CDB'
        };
        const paperInk = {
            backgroundColor: "#FAFAFA",
        };
        instructions = null;
        if (this.props.options.length === 0 || this.props.persons.length === 0) {

            instructions = (
                <Paper style={alertInk} zDepth={5}><p>This tab allows you to select one action for one participant both
                    at random.</p>
                    <p>For this to work correctly you'll need to add both actions and participants.</p></Paper>);

        }

        const listScroll = {
            overflowY: opt.length > 5 ? "scroll" : "auto",
            height: "12em",
        };

        return (
            <div className="user-content">
                <div className="container-fluid row toss-content">
                    <div className="col-sm-6 col-12">
                        {instructions}
                        <div className="roulette-container">
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <RaisedButton label="Spin" style={ink} onClick={this.click}
                                              aria-label="Boton girar Ruleta" secondary={true}/>
                            </MuiThemeProvider>
                        </div>
                        {this.props.selected?
                        <Roulette options={(this.props.options) ? this.props.options : []} baseSize={220}
                                  spin={this.props.selected.spinPandAs}
                                  spinTimeTotal={this.props.selected.spinTimePandAs}
                                  startAngle={this.props.selected.spinAnglePandAs}
                                  onSpin={this.onSpin}
                                  onComplete={this.handleRouletteSpin}
                                  weights={(this.props.weights) ? this.props.weights : []}/>
                            :null}
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="row justify-content-end">
                            <div className="col-3 center-items add-button">
                                <AddButton
                                    adding={this.props.adding}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4 col-12">
                                <MuiThemeProvider>
                                    <Paper zDepth={2} rounded={false} style={paperInk}>
                                        <h1 className="col-10 head-title">Results</h1>
                                        <Divider/>
                                        <List style={listScroll}>
                                            {results}
                                        </List>
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
                                        <h1 className="head-title">Persons</h1>
                                        <Divider/>
                                        <List style={listScroll}>
                                            {persons}
                                        </List>
                                    </Paper>
                                </MuiThemeProvider>
                            </div>
                        </div>

                    </div>
                </div>
                <OwnerDialog open={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                             onTextChange={this.props.onTextChange} onAddOwner={this.props.onAddOwner}/>
                <MuiThemeProvider>
                    <Snackbar
                        open={this.state.value !== ""}
                        message={this.props.selected.chosenOne + ": " + this.state.value}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                        bodyStyle={{height: 200, width: 200, flexGrow: 0}}
                        contentStyle={{fontSize: 30}}
                    />
                </MuiThemeProvider>
            </div>

        );


    }
}