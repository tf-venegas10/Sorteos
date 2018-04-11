import React, {Component} from 'react';
import Roulette from "../roulette/Roulette.js";
import Dialog from '../adding/CustomDialog.js';
import OwnerDialog from '../adding/OwnerDialog.js';
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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({

    palette: {
        primary1Color: "#149CDB",
        primary2Color: "#304057",
        accent1Color: "#FF8E0B",
        textColor: "#424242",
    }
});
export default class TossOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spin: false,
            value: "",
        };

        this.handleRouletteSpin = this.handleRouletteSpin.bind(this);
        this.onSpin = this.onSpin.bind(this);
        this.click = this.click.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
    }

    handleRouletteSpin(value) {

        if (this.props.action) {
            Meteor.call("tossUps.addResultA", this.props.selected._id, value);
        }
        else {
            Meteor.call("tossUps.addResultP", this.props.selected._id, value);
        }
        this.setState({value: value});
        setTimeout(()=>{
            this.setState({value: ""});
        },1000);
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
        const alertInk = {
            backgroundColor: "#FF8315"
        };

        let opt = [];
        let i = 0;
        let totalWeight = 0;
        if (this.props.weights && this.props.weights.length > 0) {
            totalWeight = this.props.weights.reduce((a, w) => a + w);
        }
        const opStyle = {
            color: "#FAFAFA",
        };
        let listStyle = {
            fontFamily: "\"Hind Madurai\",sans-serif",
            color: "#14061F",
        };
        if (this.props.weights && this.props.weights.length > 0 && this.props.options && this.props.options.length > 0) {
            this.props.options.forEach((op) => {
                    i += 1;
                    opt.push(<ListItem
                        primaryText={op + " :" + Math.round(this.props.weights[i - 1] / totalWeight * 100) + "%"}
                        key={i}
                        style={listStyle}
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
        let firstItem = {
            backgroundColor: "#DCDCDC",
            fontFamily: "\"Hind Madurai\",sans-serif",
            color: "#14061F",
        };
        if (!this.props.action) {
            if (this.props.selected && this.props.selected.resultsP) {
                this.props.selected.resultsP.forEach((op) => {
                        i += 1;
                        results.push(<ListItem
                            style={i==this.props.selected.resultsP.length?firstItem:listStyle}
                            primaryText={op} key={i}/>);
                    }
                );
            }
        }
        else {
            if (this.props.selected && this.props.selected.resultsA) {
                this.props.selected.resultsA.forEach((op) => {
                        i += 1;
                        results.push(<ListItem
                            style={i==this.props.selected.resultsA.length?firstItem:listStyle}
                            primaryText={op} key={i}/>);
                    }
                );
            }
        }
        results.reverse();
        const ink = {
            backgroundColor: '#149bda',
            color: "#FF8315",
            background: "#FF8315"
        };

        const paperInk = {
            backgroundColor: "#FAFAFA",
        };
        instructions = null;
        if (opt.length === 0) {
            if (!this.props.action) {
                instructions = (
                    <Paper style={alertInk} zDepth={5}><p>To start, you'll need to add some participants and actions to
                        your Toss-up. Use the +
                        button to do this.</p>
                        <p>Your toss-up has 4 different views. In each one of them you will get different results.
                            This tab allows you to select one participant at random.</p></Paper>)
            }
            else {
                instructions = (
                    <Paper style={alertInk} zDepth={5}><p>This tab allows you to select one action at random.</p>
                    </Paper>)
            }
        }

        const listScroll = {
            overflowY: opt.length > 5 ? "scroll" : "auto",
            height: "12em",
        };

        const listResultsScroll = {
            overflowY: results.length > 5 ? "scroll" : "auto",
            height: "12em",
        };

        return (
            <div className="user-content">
                <div className="container-fluid row toss-content">
                    <div className="col-sm-6 col-12">
                        {instructions}
                        <div className="roulette-container">
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <RaisedButton
                                    className="SpinButton"
                                    label="Spin" style={ink}
                                    onClick={this.click}
                                    aria-label="Boton girar Ruleta"
                                    secondary={true}
                                    disabled={this.props.options === [] || !this.props.options}
                                />
                            </MuiThemeProvider>
                        </div>
                        <Roulette options={(this.props.options) ? this.props.options : []} baseSize={220}
                                  spin={this.state.spin}
                                  onSpin={this.onSpin}
                                  onComplete={this.handleRouletteSpin}
                                  weights={(this.props.weights) ? this.props.weights : []}/>

                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="row justify-content-end">
                            <div className="col-3 center-items add-button">
                                <AddButton
                                    adding={this.props.adding}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-6">
                                <MuiThemeProvider>
                                    <Paper zDepth={2} rounded={false} style={paperInk}>
                                        <h1 className="head-title">Results</h1>
                                        <Divider/>
                                        <List style={listResultsScroll}>
                                            {results}
                                        </List>
                                    </Paper>
                                </MuiThemeProvider>
                            </div>
                            <div className="col-sm-6 col-6">
                                <MuiThemeProvider>
                                    <Paper zDepth={2} rounded={false} style={paperInk}>
                                        <h1 className="head-title">{this.props.person ? "Persons" : "Actions"}</h1>
                                        <Divider/>
                                        <List style={listScroll}>
                                            {opt}
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