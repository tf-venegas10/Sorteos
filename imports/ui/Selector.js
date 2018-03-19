import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Roulette from "./Roulette.js";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from './CustomDialog.js';
import AddButton from "./AddButton";
import TossOne from "./TossOne";


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
                        <TossOne options={this.props.persons} baseSize={250}
                                 weights={this.props.weightsPersons}
                                 add={this.props.add} handleClose={this.props.handleClose} action={false}
                                 person={true} adding={this.props.adding}/>
                    </Tab>
                    <Tab label="Acción" buttonStyle={background}>
                        <TossOne options={this.props.actions} baseSize={250}
                                 weights={this.props.weightsActions}
                                 add={this.props.add} handleClose={this.props.handleClose} action={true}
                                 person={false} adding={this.props.adding}/>
                    </Tab>
                    <Tab label="Persona y Acción" buttonStyle={background}>

                    </Tab>
                    <Tab label="Acción para cada persona" buttonStyle={background}>

                    </Tab>
                </Tabs>
            </MuiThemeProvider>
        );

    }

}