import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// App component - represents the whole app
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({

        palette: {
            primary1Color: "#149CDB",
            primary2Color: "#304057",
            accent1Color: "#FF8E0B",
            textColor: "#424242",
        }
    });

export default class AddButton extends Component {


    render() {
        const background={
            backgroundColor: '#1498D5',
            height: '50',
            width: '50'
        };

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <FloatingActionButton onClick={this.props.adding} style={background} secondary={true} className="floatingButton" aria-label="Button to add participants or actions">
                    <ContentAdd/>
                </FloatingActionButton>
            </MuiThemeProvider>

        );

    }

}