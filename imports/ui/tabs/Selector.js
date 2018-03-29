import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TossOne from "./TossOne";
import TossPandA from "./TossPandA";
import Toss4All from "./Toss4All";


// App component - represents the whole app

export default class Selector extends Component {


    render() {
        const background = {
            backgroundColor: '#1498d5'
        };
        const ink = {
            backgroundColor: '#BBDBB8'
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
                                 person={true} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                 onTextChange={this.props.onTextChange}
                                 onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                 onAddPerson={this.props.onAddPerson}/>
                    </Tab>
                    <Tab label="Acción" buttonStyle={background}>
                        <TossOne options={this.props.actions} baseSize={250}
                                 weights={this.props.weightsActions}
                                 add={this.props.add} handleClose={this.props.handleClose} action={true}
                                 person={false} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                 onTextChange={this.props.onTextChange}
                                 onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                 onAddPerson={this.props.onAddPerson}/>
                    </Tab>
                    <Tab label="Persona y Acción" buttonStyle={background}>
                        <TossPandA options={this.props.actions} baseSize={250}
                                   weights={this.props.weightsActions}
                                   add={this.props.add} handleClose={this.props.handleClose} action={true}
                                   person={true} adding={this.props.adding}  handleDelete={this.props.handleDelete}
                                   persons={this.props.persons} weightsPersons={this.props.weightsPersons}
                                   onTextChange={this.props.onTextChange}
                                   onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                   onAddPerson={this.props.onAddPerson}/>
                    </Tab>
                    <Tab label="Acción para cada persona" buttonStyle={background}>
                        <Toss4All options={this.props.actions} baseSize={250}
                                  weights={this.props.weightsActions}
                                  add={this.props.add} handleClose={this.props.handleClose} action={true}
                                  person={true} adding={this.props.adding}  handleDelete={this.props.handleDelete}
                                  persons={this.props.persons} weightsPersons={this.props.weightsPersons}
                                  onTextChange={this.props.onTextChange}
                                  onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                  onAddPerson={this.props.onAddPerson}/>
                    </Tab>
                </Tabs>
            </MuiThemeProvider>
        );

    }

}