import React, {Component} from "react";
import {PartnerName} from "./PartnerName/PartnerName";
import {TeamName} from "./TeamName/TeamName";

import {Members} from "./Members/Members";

import './ManageArea.css';
import {Button} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

export class ManageArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: {},
            id: this.props.location.state.id,
            message: '',
            messageOpen: false
        };
    }

    componentDidMount() {
        this.updateTeam();
    };

    updateName = (newName) => {
        this.state.team.name = newName;
        console.log(this.state.team);
    };
    updatePartner = (newPartner) => {
        this.state.team.partner = newPartner;
    };
    updateMembers = (members) => {
        this.state.team.members = members;

    };
    updateTeam = () => {
        const axios = require('axios');
        axios.post('/api/oneTeam',
            {
                id: this.state.id,
            })
            .then(resp => {
                this.setState({
                    team: resp.data.content,
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
    commitChanges = () => {
        const axios = require('axios');
        axios.post('/api/updateTeam',
            {
                team: this.state.team,
            })
            .then(resp => {
                this.showMessage("Team was successfully updated");
            })
            .catch(err => {
                    this.showMessage("Something went wrong while updating");
                }
            );
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

    render() {
        if (this.state.success) {
            return (
                <div>
                    <TeamName updateFunction={this.updateName} name={this.state.team.name}/>
                    <PartnerName updateFunction={this.updatePartner} name={this.state.team.partner}/>
                    <Members updateFunction={this.updateMembers} members={this.state.team.members}/>
                    <div className={"updateBtnWrapper"}>
                        <Button onClick={this.commitChanges} color={"secondary"} variant={"contained"}>Update</Button>
                    </div>
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
                </div>
            )
        } else {
            return (
                <span>loading...</span>
            )
        }
    }
}