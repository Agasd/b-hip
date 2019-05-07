import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import withAuth from './components/withAuth';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

class App extends Component {
    render() {
        return (

            /*
            * Routing between login page and admin dashboard.
            * Because of the withAuth component the user can't access the dashboard without having the proper JWT token
            * */
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={withAuth(Dashboard)}/>
            </Switch>
        );
    }
}

export default App;
