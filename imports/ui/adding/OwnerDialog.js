import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import Paper from 'material-ui/Paper';



// App component - represents the whole app

export default class OwnerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            help:false,
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
        };
        this.state.inputText = "";
        this.state.inputNumb = 1;
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
            Help=<Paper zDepth={5}><p>Add new <strong>owners</strong> to the toss up so that they can see the results, launch it and manage it.</p>
                <p>Add them directly by their <strong>username</strong>.</p>
                <p>Separte by <strong>,</strong> if you wish to add several at a time. For example: username1,username2</p></Paper>
        }


        return (

            <MuiThemeProvider>
                <Dialog
                    actions={this.state.actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleCloseOwner}
                    contentStyle={customContentStyle}>
                    <label htmlFor="textInput">Owners (separated by comma) <input id="textInput" type="text"
                                                                                  onChange={this.props.onTextChange}/></label>
                    <ActionHelp onClick={this.help}/>
                    {Help}
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