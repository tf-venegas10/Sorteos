import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// App component - represents the whole app

export default class CustomDialog extends Component {




    render() {
        const customContentStyle = {
            width: '200px',
            maxWidth: 'none',
        };
        let actions = [
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
            />,
        ];

        if(!this.props.action){
            let x=actions.pop();
            actions.pop();
            actions.push(x);
        }

        return (

            <MuiThemeProvider>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                    contentStyle={customContentStyle}
                >
                </Dialog>
            </MuiThemeProvider>

        );

    }

}