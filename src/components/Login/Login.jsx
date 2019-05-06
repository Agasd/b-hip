import React, { Component } from 'react';
import LoginBox from "./loginBox/LoginBox";

import './Login.css';
import {Redirect} from "react-router-dom";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false,
    };
  }
  componentDidMount() {
    fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
            this.setState({ loading: false, redirect: true });

          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: false });
        });
  }
  render() {
    const { loading, redirect } = this.state;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
  return (
      <div className={"loginWrapper"}>
        <LoginBox
            title={"Admin Login"}
            redirectUrl={"/dashboard"}
            auth={"/api/authenticate"}
        />
      </div>
  )
  }
}