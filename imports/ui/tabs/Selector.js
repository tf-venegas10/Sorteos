import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TossOne from "./TossOne";
import TossPandA from "./TossPandA";
import Toss4All from "./Toss4All";


// App component - represents the whole app

export default class Selector extends Component {
    componentDidMount() {
        this.props.addSteps([{
            title: "Add participants",
            text: "Now lets add new participants to the toss-up",
            type: 'hover',
            selector: ".body-content > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)",
        }, {
            title: "Add actions",
            type: 'hover',
            text: "To do something more than just choose a random participant add actions to the toss-up too.",
            selector: ".body-content > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)",
        }, {
            title: "Choose participant",
            type: 'hover',
            text: "Your toss-up has 4 different views. In each one of them you will get different results. This tab allows you to select one participant at random.",
            selector: "html body div#render-target div div.user-banner div div.center-items.body-content div div div button",
        }, {
            title: "Choose action",
            type: 'hover',
            text: "This tab allows you to select one action at random.",
            selector: ".body-content > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(2)",
        }, {
            title: "Choose one action for one participant",
            type: 'hover',
            text: "This tab allows you to select one action for one participant both at random.",
            selector: ".body-content > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(3)",
        }, {
            title: "Choose one action for each participant or one participant for each action",
            type: 'hover',
            text: "This tab allows you to select  action for each participant or one participant for each action at random.",
            selector: ".body-content > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(4)",
        }]);
    }


    render() {
        const background = {
            backgroundColor: '#1498d5',
            fontFamily: "\"Nova Slim\", sans-serif",
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
        const titleStyle = {
            textAlign: "center"
        };
        return (
            <div>
                <MuiThemeProvider>
                    <Tabs inkBarStyle={ink}>
                        <Tab label="Person" buttonStyle={background}>
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
                        <Tab label="Action" buttonStyle={background}>
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
                        <Tab label="Person & Action" buttonStyle={background}>
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
                        <Tab label="Action for each Person" buttonStyle={background}>
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