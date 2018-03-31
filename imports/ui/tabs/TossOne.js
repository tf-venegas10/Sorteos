import React, {Component} from 'react';
import Roulette from "../roulette/Roulette.js";
import Dialog from '../adding/CustomDialog.js';
import AddButton from "../adding/AddButton";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import "./TossOne.css";
// App component - represents the random person sorting app

export default class TossOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            spin: false,
            value: ""
        };
        this.handleRouletteSpin = this.handleRouletteSpin.bind(this);
        this.onSpin = this.onSpin.bind(this);
        this.click = this.click.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
    }

    handleRouletteSpin(value) {
        this.setState((prevState) => {
            let actions = prevState.selected;
            actions.push(value);
            return ({selected: actions, value: value});
        });


    };

    //TODO: handle request delete
    handleRequestDelete(i) {
        this.props.handleDelete(i - 1, this.props.action);
    };

    click() {
        this.setState({spin: true, value: ""});
    }

    onSpin(callback) {
        this.setState({spin: false, value: ""},
            callback);
    }

    render() {

        let opt = [];
        let i = 0;
        let totalWeight=0;
        if(this.props.weights && this.props.weights.length>0) {
            totalWeight = this.props.weights.reduce((a, w) => a + w);
        }
        const opStyle = {
            color: "#FFFFFF"
        };
        if(this.props.weights&& this.props.weights.length>0 && this.props.options && this.props.options.length>0) {
            this.props.options.forEach((op) => {
                    i += 1;
                    opt.push(<ListItem
                        primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalWeight * 100) + "%"}
                        key={i}
                        stylye={opStyle}
                        rightIcon={
                            <ActionDelete
                                onClick={this.handleRequestDelete.bind(this, i)}
                                style={opStyle}
                            />
                        }
                    />);
                }
            );
        }
        i = 0;
        let results = [];
        this.state.selected.forEach((op) => {
                i += 1;
                results.push(<ListItem primaryText={op} key={i}/>);
            }
        );
        const ink = {
            backgroundColor: '#149bda'
        };

        const paperInk = {
            backgroundColor: "#BBDBB8",
        };

        return (
            <div>
                <div className="container-fluid row toss-content">
                    <div className="col-sm-9 col-12">
                        <div className="roulette-container">
                            <MuiThemeProvider>
                                <RaisedButton
                                    className="SpinButton"
                                    label="Spin" style={ink}
                                    onClick={this.click}
                                    aria-label="Boton girar Ruleta"
                                    disabled={this.props.options===[]||!this.props.options}
                                />
                            </MuiThemeProvider>
                        </div>
                        <Roulette options={(this.props.options)?this.props.options:[]} baseSize={250} spin={this.state.spin}
                                  onSpin={this.onSpin}
                                  onComplete={this.handleRouletteSpin} weights={(this.props.weights)?this.props.weights:[]}/>
                    </div>
                    <div className="col-sm-3 col-8 center-items">
                        <MuiThemeProvider>
                            <Paper zDepth={2} rounded={false} style={paperInk}>
                                <List>
                                    {opt}
                                </List>
                                <Divider/>
                                <List>
                                    {results}
                                </List>
                            </Paper>
                        </MuiThemeProvider>
                        <div className="row justify-content-end">
                            <div className="col-11"></div>
                            <div className="col-2">
                                <AddButton adding={this.props.adding}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog open={this.props.add} handleClose={this.props.handleClose} action={this.props.action}
                        person={this.props.person} onTextChange={this.props.onTextChange}
                        onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                        onAddPerson={this.props.onAddPerson}/>
                <MuiThemeProvider>
                    <Snackbar
                        open={this.state.value !== ""}
                        message={this.state.value}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                        bodyStyle={{height: 200, width: 200, flexGrow: 0}}
                        contentStyle={{fontSize: 30}}/>
                </MuiThemeProvider>
            </div>

        );


    }
}