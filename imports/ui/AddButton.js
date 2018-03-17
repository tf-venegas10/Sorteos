import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// App component - represents the whole app

export default class AddButton extends Component {


    render() {
        const background={
            backgroundColor: '#149bda'
        };

        return (
            <MuiThemeProvider>
                <FloatingActionButton onClick={this.props.adding} style={background}>
                    <ContentAdd/>
                </FloatingActionButton>
            </MuiThemeProvider>

        );

    }

}