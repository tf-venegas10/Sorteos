import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Roulette from "./Roulette.js";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from './CustomDialog.js';
import AddButton from "./AddButton";


// App component - represents the whole app

export default class Selector extends Component {


    render() {
        const background = {
            backgroundColor: '#002459'
        };
        const ink = {
            backgroundColor: '#149bda'
        };
        const headline = {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400
        };
        return (
            <MuiThemeProvider>
                <Tabs inkBarStyle={ink}>
                    <Tab label="Persona" buttonStyle={background}>
                        <div className="row">
                            <div className="col-11"></div>
                            <div className="col-1">
                                <AddButton adding={this.props.adding}/>
                            </div>
                        </div>
                        <div className="container-fluid row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <Roulette options={this.props.options} baseSize={250}
                                          onComplete={this.props.handleOnComplete} weights={this.props.weights}/>
                            </div>

                            <div className="col-1"></div>

                        </div>
                        <Dialog open={this.props.add} handleClose={this.props.handleClose} action={false}
                                person={true}/>
                    </Tab>
                    <Tab label="Acción" buttonStyle={background}>
                        <div className="row">
                            <div className="col-11"></div>
                            <div className="col-1">
                                <AddButton adding={this.props.adding}/>
                            </div>
                        </div>
                        <div className="container-fluid row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <Roulette options={this.props.options} baseSize={250}
                                          onComplete={this.props.handleOnComplete} weights={this.props.weights}/>
                            </div>

                            <div className="col-1"></div>

                        </div>
                        <Dialog open={this.props.add} handleClose={this.props.handleClose} action={true}
                                person={false}/>
                    </Tab>
                    <Tab label="Persona y Acción" buttonStyle={background}>
                        <div className="row">
                            <div className="col-11"></div>
                            <div className="col-1">
                                <AddButton adding={this.props.adding}/>
                            </div>
                        </div>
                        <div className="container-fluid row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <Roulette options={this.props.options} baseSize={250}
                                          onComplete={this.props.handleOnComplete} weights={this.props.weights}/>
                            </div>

                            <div className="col-1"></div>

                        </div>
                        <Dialog open={this.props.add} handleClose={this.props.handleClose} action={true} person={true}/>
                    </Tab>
                    <Tab
                        label="Acción para cada persona"
                        data-route="/home"
                        buttonStyle={background}

                    >
                        <div>
                            <h2 style={headline}>Tab Three</h2>
                            <p>
                                This is a third example tab.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </MuiThemeProvider>
        );

    }

}