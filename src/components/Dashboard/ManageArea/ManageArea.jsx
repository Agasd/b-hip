import React, {Component} from "react";
import {PartnerName} from "./PartnerName/PartnerName";
import {TeamName} from "./TeamName/TeamName";

import {Members} from "./Members/Members";

import './ManageArea.css';

export class ManageArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: {},
            id: this.props.location.state.id
        };
    }
    componentDidMount() {
        this.updateTeam();
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
    render() {
        if(this.state.success) {
            return (
                <div>
                    <TeamName name={this.state.team.name}/>
                    <PartnerName name={this.state.team.partner}/>
                    <Members members={this.state.team.members}/>
                </div>
            )
        }
        else {
            return(
                <span>loading...</span>
            )
        }
    }
}