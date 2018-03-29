import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import SignOut from "material-ui/svg-icons/action/power-settings-new"
import {white} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

/**
 * This className contains all needed to display the nav bar on top.
 */
export default class NavbarUser extends Component {

    render() {
        const background = {
            backgroundColor: 'rgb(55,55,55)'
        };
        const titleStyle = {
            textAlign: "center"
        };
        const boldStyle={
            textAlign: "center",
            fontWeight: "bold"
        };
        return (
            <div>
            <MuiThemeProvider>
                <AppBar
                    title={<img className="col-4 col-sm-2 col-md-1" src="name.png" alt="Toss-App"/>}
                    iconElementLeft={
                        <IconMenu
                            iconButtonElement={<IconButton aria-label="Boton para expandir el menu"
                            ><Menu color={white}/></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}

                        >
                            <MenuItem primaryText="Sign out" leftIcon={<SignOut/>}
                                      onClick={this.props.onLogoutCallback}/>
                            <Divider/>
                            <MenuItem primaryText="Nuevo Sorteo" leftIcon={<ContentAdd/>}
                                      onClick={this.props.openNew}/>
                            <Divider/>
                            <MenuItem primaryText="Mis Sorteos" style={boldStyle}
                            />
                            <MenuItem primaryText="Sorteo 1" style={titleStyle}
                            />
                            <MenuItem primaryText="Sorteo 2"  style={titleStyle}
                            />
                        </IconMenu>
                    }
                    style={background}
                    titleStyle={titleStyle}
                />
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Dialog
                    actions={[

                        <FlatButton
                            label="Add New"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.props.handleNew}
                            ariaLabel="Boton para agragar accion"
                        />,
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onClick={this.props.handleClose}
                            ariaLabel="Cancelar"
                        />
                    ]}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                        >
                        <label htmlFor="textInput">Nombre</label><input id="textInput" type="text"
                    onChange={this.props.onTextChange}
                    />

            </Dialog>
            </MuiThemeProvider>
            </div>

        );
    }
}
