import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// App component - represents the whole app

export default class OwnerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [

                <FlatButton
                    label="Add Owner"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.props.onAddOwner}
                    aria-label="Owner add button"
                />,
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onClick={this.props.handleCloseOwner}
                    aria-label="Cancel button"
                />
            ]
        }
        this.state.inputText = "";
        this.state.inputNumb = 1;

    }


    render() {
        const customContentStyle = {
            width: '20%',
            maxWidth: 'none',

        };


        return (

            <MuiThemeProvider>
                <Dialog
                    actions={this.state.actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleCloseOwner}
                    contentStyle={customContentStyle}>
                    <label htmlFor="textInput">Owners (separated by comma)</label><input id="textInput" type="text"
                                                                   onChange={this.props.onTextChange}/>
                </Dialog>
            </MuiThemeProvider>

        );

    }

}
OwnerDialog.propTypes={
    open:PropTypes.bool.isRequired,
    handleCloseOwner:PropTypes.func.isRequired,
    onTextChange:PropTypes.func.isRequired,
    onAddOwner:PropTypes.func.isRequired,
    handleCloseOwner: PropTypes.func.isRequired,
};