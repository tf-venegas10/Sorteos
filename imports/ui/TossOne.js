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
        if (this.props.action) {
            this.setState((prevState) => {
                let actions = prevState.selected;
                actions.push(value);
                return ({selectedActions: actions, value: value});
            })
        } else {
            this.setState((prevState) => {
                let actions = prevState.selected;
                actions.push(value);
                return ({selectedActions: actions, value: value});
            })
        }
    };

    //TODO: handle request delete
    handleRequestDelete(i) {
        this.props.handleDelete(i - 1, this.props.action);
    };

    click() {
        this.setState({spin: true,value:""});
    }

    onSpin(callback) {
        this.setState({spin: false, value: ""},
            callback);
    }

    render() {

        let opt = [];
        let i = 0;
        this.props.options.forEach((op) => {
                i += 1;
                opt.push(<ListItem primaryText={op} key={i}
                                   rightIcon={<ActionDelete onClick={this.handleRequestDelete.bind(this, i)}/>}/>);
            }
        );
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

        return (
            <div>
                <div className="row">
                    <div className="col-11"></div>
                    <div className="col-1">
                        <AddButton adding={this.props.adding}/>
                    </div>
                </div>
                <div className="container-fluid row">

                    <div className="col-10">
                        <div className="roulette-container">
                            <MuiThemeProvider>
                                <RaisedButton label="Spin" style={ink} onClick={this.click}/>
                            </MuiThemeProvider>
                        </div>
                        <Roulette options={this.props.options} baseSize={250} spin={this.state.spin}
                                  onSpin={this.onSpin}
                                  onComplete={this.handleRouletteSpin} weights={this.props.weights}/>
                    </div>
                    <div className="col-2">
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


                </div>
                <Dialog open={this.props.add} handleClose={this.props.handleClose} action={this.props.action}
                        person={this.props.person}/>
                <MuiThemeProvider>
                    <Snackbar
                        open={this.state.value!==""}
                        message={this.state.value}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </MuiThemeProvider>
            </div>

        );


    }
}