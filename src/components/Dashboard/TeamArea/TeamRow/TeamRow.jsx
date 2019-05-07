import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import React, {Component} from "react";
import {Link} from "react-router-dom";

import './TeamRow.css';

export class TeamRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleDeleteClick = () => {
        this.props.handleRowDeletion(this.props.id);
    };

    render() {
        return (
            <Paper>
                <Grid container className="container"
                      direction="row"
                >
                    <Grid item
                          sm={12}
                          lg={9}
                    >
                        <ul className="contentText">
                            <li>
                                <h2>
                                    Team name: {this.props.name}
                                </h2>
                            </li>
                            <li>
                                <span>Partner: {this.props.partner}</span>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item className="buttonContainer"
                          sm={12}
                          lg={3}
                    >
                        <Link to={{
                            pathname: '/dashboard/manage',
                            state: {
                                id: this.props.id
                            }
                        }}>
                            <Button variant="contained" color="primary" className="scheduleBtn">
                                Manage
                            </Button>
                        </Link>
                        <Button color="secondary" onClick={this.handleDeleteClick} className="buttonSchedule">
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}