import React, {Component} from "react";
import Paper from '@material-ui/core/Paper/index';
import {Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button/index';

import './LoginBox.css';
import {withRouter} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

/*
 *This component has the actual logic for login
 * It's reusable for other user types with no or only minor changes
 * */
class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            open: false
        };

    }

    handleClose = (event, reason) => {
        this.setState({open: false});
    };
    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        fetch(this.props.auth, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push(this.props.redirectUrl);
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                this.setState({open: true});
            });
    };

    render() {
        return (
            <div>
                <Paper className={"loginBox"} elevation={1}>
                    <form onSubmit={this.onSubmit}>
                        <Typography align={"center"} variant="h5" gutterBottom>{this.props.title}</Typography>
                        <TextField
                            id="standard-with-placeholder"
                            label="Email"
                            name="email"
                            margin="normal"

                            type="email"

                            value={this.state.email}
                            onChange={this.handleInputChange}

                            fullWidth
                            required
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            margin="normal"

                            value={this.state.password}
                            onChange={this.handleInputChange}

                            fullWidth
                            required
                        />
                        <Button variant="contained" type="submit" color="primary" id={"loginButton"}>
                            Login
                        </Button>
                    </form>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Invalid email or password</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            CLOSE
                        </Button>,
                    ]}
                />
            </div>
        )
    }

}

export default withRouter(LoginBox)