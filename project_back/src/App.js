import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Banner from "./pages/Banner";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.loginInfo ? "" : <Redirect to="/" />}
        <Route path="/" exact component={Login} />
        <Route path="/banner" component={Banner} />
      </>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {})(App);
