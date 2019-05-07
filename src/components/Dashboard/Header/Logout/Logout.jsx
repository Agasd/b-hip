import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false
        }
    }

    handleLogout = () => {
        fetch('/api/logout');
        this.setState({
            logout: true
        })
    };

    render() {
        if (this.state.logout) {
            return <Redirect to="/"/>;
        }
        return (
            <div id={this.props.id}>
                <Button
                    id={this.props.id}
                    onClick={this.handleLogout}
                    variant="contained"
                    color="secondary"
                >
                    Logout
                </Button>
            </div>
        );
    }
}