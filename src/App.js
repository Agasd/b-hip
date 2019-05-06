import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import withAuth from './components/withAuth';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={withAuth(Dashboard)} />
        </Switch>
    );
  }
}

export default App;
