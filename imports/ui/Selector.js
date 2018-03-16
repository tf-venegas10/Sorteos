import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Roulette from "./Roulette.js";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from './CustomDialog.js';


// App component - represents the whole app

export default class Selector extends Component {


    render() {
        const background={
            backgroundColor: 'rgb(55,55,55)'
        };
        const headline = {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400
            };
        return (
            <MuiThemeProvider>
            <Tabs>
                <Tab label="Sortear una acción">
                    <div className="row">
                        <div className="col-11"></div>
                        <div className="col-1">
                            <MuiThemeProvider>
                                <FloatingActionButton onClick={this.props.adding}>
                                    <ContentAdd/>
                                </FloatingActionButton>
                            </MuiThemeProvider>
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
                    <Dialog open={this.props.add} handleClose={this.props.handleClose} action={false}/>
                </Tab>
                <Tab label="Sortear una persona y una acción">
                    <div className="row">
                        <div className="col-11"></div>
                        <div className="col-1">
                            <MuiThemeProvider>
                                <FloatingActionButton onClick={this.props.adding}>
                                    <ContentAdd/>
                                </FloatingActionButton>
                            </MuiThemeProvider>
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
                    <Dialog open={this.props.add} handleClose={this.props.handleClose} action={true}/>
                </Tab>
                <Tab
                    label="Sortear una acción para cada persona"
                    data-route="/home"

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