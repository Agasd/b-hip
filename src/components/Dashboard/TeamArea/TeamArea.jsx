import React, {Component} from 'react';
import TeamButton from "./TeamButton/TeamButton";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import {TeamRow} from "./TeamRow/TeamRow";

import './TeamArea.css'
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

export default class TeamArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            message: '',
            messageOpen: false,
            deleteDialogOpen: false,
            deleteRowId: -1
        };
    }

    componentDidMount() {
        this.updateRows();
    }

    updateRows = () => {
        const axios = require('axios');
        axios.get('/api/allTeams')
            .then(resp => {
                this.setState({
                    rows: resp.data.content,
                    success: true
                });
            })
            .catch(
                () => {
                    this.setState({
                        success: false
                    })
                }
            );
    };
    newRowCallBack = (message) => {
        this.updateRows();
        this.showMessage(message);
    };
    handleRowDeleteClick = (id) => {
        this.setState(
            {
                deleteDialogOpen: true,
                deleteRowId: id
            });
    };
    deleteRow = () => {
        fetch('/api/delete', {
            method: 'POST',
            body: JSON.stringify({'id': this.state.deleteRowId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.updateRows();
                    this.showMessage("Team was successfully deleted");
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                this.showMessage("Something went wrong while deleting the team");
            });
        this.handleDeleteDialogClose()
    };
    showMessage = (message) => {
        this.setState({
            message: message,
            messageOpen: true
        });

    };
    handleClose = (event, reason) => {
        this.setState({messageOpen: false});
    };
    handleDeleteDialogClose = (event, reason) => {
        this.setState({deleteDialogOpen: false});
    };

    render() {
        const rows = this.state.rows.map((item, i) =>
            <React.Fragment key={item._id}>
                <Grid item
                      className="spacer"
                      xs={false}
                      sm={3}
                >
                </Grid>
                <Grid item
                      sm={6}
                      xs={12}
                >
                    <TeamRow handleRowDeletion={this.handleRowDeleteClick} name={item.name} partner={item.partner}
                             id={item._id}/>
                </Grid>
                <Grid item
                      className="spacer"
                      xs={false}
                      sm={3}
                >
                </Grid>
            </React.Fragment>
        );
        return (
            <div>
                <Typography align={"center"} variant="h3" gutterBottom>
                    Manage Teams
                </Typography>
                <Grid container className="container"
                      direction="row"
                      alignItems="center"
                >
                    {rows}
                </Grid>

                <TeamButton callback={this.newRowCallBack} id={"addTeamBtn"}/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.messageOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            CLOSE
                        </Button>
                    ]}
                />
                <Dialog
                    open={this.state.deleteDialogOpen}
                    onClose={this.handleDeleteDialogClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.deleteRow} color="secondary">
                            YES
                        </Button>
                        <Button onClick={this.handleDeleteDialogClose} color="primary" autoFocus>
                            NO
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}