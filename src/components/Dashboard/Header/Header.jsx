import React, { Component } from 'react';
import Logout from "./Logout/Logout";

import './Header.css'
import {Typography} from "@material-ui/core";
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleNewTeam = () => {
        fetch('/api/logout');
        this.setState({
            logout: true
        })
    };
    render() {
        return(
            <nav className={"header"}>
                <Typography variant="h6" id={"headerText"}>
                     Admin Dashboard
                </Typography>
                <Logout id={"logoutBtn"}/>
            </nav>
        )
    }
}