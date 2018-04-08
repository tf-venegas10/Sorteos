import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import Paper from 'material-ui/Paper';


// App component - represents the whole app

export default class NewTossUpDialog extends Component {
    constructor(props) {
        super(props);
        this.state={};
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
            Help=<Paper><p>Choose a name for your new Toss-up you'll be able to find it later by this name.</p>
                </Paper>
        }

        return (

            <MuiThemeProvider>
                <Dialog
                    actions={[

                        <FlatButton
                            label="Add New"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.props.handleNew}
                            aria-label="Button to add action"
                        />,
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={this.props.handleClose}
                            aria-label="Cancel"
                        />
                    ]}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                >
                    <label htmlFor="textInput">Toss-up Name</label><input id="textInput" type="text"
                                                                          onChange={this.props.onTextChange}
                />
                    <ActionHelp onClick={this.help}/>
                    {Help}
                </Dialog>
            </MuiThemeProvider>

        );

    }

}