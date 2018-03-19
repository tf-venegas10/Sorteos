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
                        onClick={this.props.handleClose}
                    />,
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.props.handleClose}
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
                        onClick={this.props.handleClose}
                    />,
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.props.handleClose}
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
                        onClick={this.props.handleClose}
                    />,
                    <FlatButton
                        label="Add Action"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.handleClose}
                    />,
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.props.handleClose}
                    />
                ]
            }
        }
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
                    <input/>
                </Dialog>
            </MuiThemeProvider>

        );

    }

}