import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TossOne from "./TossOne";
import TossPandA from "./TossPandA";
import Toss4All from "./Toss4All";
import "./Selector.css";
import Gift from 'material-ui/svg-icons/action/redeem';
import Face from 'material-ui/svg-icons/action/face';
import Action from 'material-ui/svg-icons/action/motorcycle';
import ListCheck from 'material-ui/svg-icons/av/playlist-add-check';


// App component - represents the whole app

export default class Selector extends Component {

    render() {
        const background = {
            backgroundColor: '#1498d5',
            fontFamily: "\"Nova Slim\", sans-serif",
        };

        const ink = {
            backgroundColor: '#BBDBB8'
        };

        return (
            <div>
                <MuiThemeProvider>
                    <Tabs inkBarStyle={ink}>
                        <Tab label={<h3>Person</h3>} buttonStyle={background} icon={<Face/>}>
                            <TossOne options={this.props.persons} baseSize={250}
                                     weights={this.props.weightsPersons}
                                     add={this.props.add} handleClose={this.props.handleClose}
                                     addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                     action={false}
                                     person={true} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                     onTextChange={this.props.onTextChange}
                                     onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                     onAddPerson={this.props.onAddPerson}
                                     onAddOwner={this.props.onAddOwner}
                                     onSelection={this.props.handleSelectedTossOnePerson}
                                     selected={this.props.tossData}
                            />
                        </Tab>
                        <Tab label={<h3>Action</h3>} buttonStyle={background} icon={<Action/>}>
                            <TossOne options={this.props.actions} baseSize={250}
                                     weights={this.props.weightsActions}
                                     add={this.props.add} handleClose={this.props.handleClose}
                                     addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                     action={true}
                                     person={false} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                     onTextChange={this.props.onTextChange}
                                     onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                     onAddPerson={this.props.onAddPerson}
                                     onAddOwner={this.props.onAddOwner}
                                     onSelection={this.props.handleSelectedTossOneAction}
                                     selected={this.props.tossData}
                            />
                        </Tab>
                        <Tab label={<h3>Person & Action</h3>} buttonStyle={background} icon={<Gift/>}>
                            <TossPandA options={this.props.actions} baseSize={250}
                                       weights={this.props.weightsActions}
                                       add={this.props.add} handleClose={this.props.handleClose}
                                       addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                       action={true}
                                       person={true} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                       persons={this.props.persons} weightsPersons={this.props.weightsPersons}
                                       onTextChange={this.props.onTextChange}
                                       onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                       onAddPerson={this.props.onAddPerson}
                                       onAddOwner={this.props.onAddOwner}
                                       onSelection={this.props.handleSelectedTossPandA}
                                       selected={this.props.tossData}
                            />
                        </Tab>
                        <Tab label={<h3>Actions for all</h3>} buttonStyle={background} icon={<ListCheck/>}>
                            <Toss4All options={this.props.actions} baseSize={250}
                                      weights={this.props.weightsActions}
                                      add={this.props.add} handleClose={this.props.handleClose}
                                      addOwner={this.props.addOwner} handleCloseOwner={this.props.handleCloseOwner}
                                      action={true}
                                      person={true} adding={this.props.adding} handleDelete={this.props.handleDelete}
                                      persons={this.props.persons} weightsPersons={this.props.weightsPersons}
                                      onTextChange={this.props.onTextChange}
                                      onNumberChange={this.props.onNumberChange} onAddAction={this.props.onAddAction}
                                      onAddPerson={this.props.onAddPerson}
                                      onAddOwner={this.props.onAddOwner}
                                      onSelection={this.props.handleSelectedToss4All}
                                      selected={this.props.tossData}
                            />
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
            </div>
        );

    }

}