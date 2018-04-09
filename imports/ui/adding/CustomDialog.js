import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import Paper from 'material-ui/Paper';


// App component - represents the whole app

export default class CustomDialog extends Component {
    constructor(props) {
        super(props);
        if (!props.person) {
            this.state = {
                actions: [

                    <FlatButton
                        label="Add Action"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.onAddAction}
                        aria-label="Boton para agragar accion"
                    />,
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.props.handleClose}
                        aria-label="Cancelar"
                    />
                ]
            }
        }
        if (!props.action) {
            this.state = {
                actions: [
                    <FlatButton
                        label="Add Participant"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.onAddPerson}
                        aria-label="Button to add participant"

                    />,
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.props.handleClose}
                        aria-label="Cancelar"
                    />
                ]
            }
        }
        else {
            this.state = {
                actions: [
                    <FlatButton
                        label="Add Participant"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.onAddPerson}
                        aria-label="Button to add participant"
                    />,
                    <FlatButton
                        label="Add Action"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.onAddAction}
                        aria-label="Boton para agragar accion"

                    />,
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.props.handleClose}
                        aria-label="Cancelar"
                    />
                ]
            }
        }
        this.state.inputText = "";
        this.state.inputNumb = 1;
        this.state.help=false;
        this.help=this.help.bind(this);
        this.closeHelp=this.closeHelp.bind(this);

    }

    help(){
        this.setState((prevState)=>{return {help:!prevState.help}});
    }

    closeHelp(){
        this.setState({help:false});
    }


    render() {
        const customContentStyle = {
            width: '300px',
            maxWidth: 'none',

        };
        let Help=null;
        if(this.state.help){
            Help=<Paper zDepth={5}><p>Add actions or participants entering their <strong>name</strong> on the first input.</p>
                <p>The <strong>weight</strong> input corresponds to the probabilistic weight you wish to give to your action or participant.
                It defaults to 1 but if you want it to have a bigger probability give it a bigger value.</p></Paper>
        }

        return (

            <MuiThemeProvider>
                <Dialog
                    actions={this.state.actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                    contentStyle={customContentStyle}
                >
                    <label htmlFor="textInput">Name <input id="textInput" type="text"
                                                                  onChange={this.props.onTextChange}
                    /></label>
                    <label htmlFor="numberInput">Weight  <input id="numberInput" type="number"
                                                                onChange={this.props.onNumberChange}
                                                                value={this.props.inputNumb}
                    /></label>
                    <ActionHelp onClick={this.help}/>
                    {Help}
                </Dialog>
            </MuiThemeProvider>

        );

    }

}