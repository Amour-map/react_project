import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Banner from "./pages/Banner";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(sessionStorage.getItem("login")) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <>
        {this.props.loginInfo ? "" : <Redirect to="/login" />}
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Banner} />
      </>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {})(App);
