import React, {Component} from 'react';
import PropTypes from "prop-types";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader} from "material-ui/Card"

export default class LoginManager extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <Card>
                    <CardHeader
                        title="Login"
                    />
                </Card>
            </MuiThemeProvider>
        );
    }
}

LoginManager.propTypes = {
    submitAction : PropTypes.func.isRequired,
};