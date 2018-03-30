import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
                        aria-label="Boton para agragar participante"

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
                        aria-label="Boton para agragar participante"
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

    }




    render() {
        const customContentStyle = {
            width: '200px',
            maxWidth: 'none',

        };


        return (

            <MuiThemeProvider>
                <Dialog
                    actions={this.state.actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                    contentStyle={customContentStyle}
                >
                    <label htmlFor="textInput">Valor</label><input id="textInput" type="text"
                                                                   onChange={this.props.onTextChange}
                />
                    <label htmlFor="numberInput">Peso</label> <input id="numberInput" type="number"
                                                                     onChange={this.props.onNumberChange}
                                                                     />
                </Dialog>
            </MuiThemeProvider>

        );

    }

}