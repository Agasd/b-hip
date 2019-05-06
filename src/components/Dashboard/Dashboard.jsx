import React, { Component } from 'react';
import Header from "./Header/Header";
import TeamArea from "./TeamArea/TeamArea";
import {Route, Switch} from "react-router-dom";
import Login from "../Login/Login";
import withAuth from "../withAuth";
import {ManageArea} from "./ManageArea/ManageArea";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path={this.props.match.path} component={withAuth(TeamArea)} />
                <Route path={`${this.props.match.path}/manage`} component={withAuth(ManageArea)} />
            </Switch>
        </div>
    )
  }
}


