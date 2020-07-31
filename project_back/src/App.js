import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { setLoginStatus } from "./store/action";
import Login from "./pages/Login";
import Banner from "./pages/Banner";
import fetchJson from "./utils/fetchJson";

class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    let data = await fetchJson("admin/checklogin");
    if(!data.ok) {
      this.props.history.push("/login");
    } else {
      this.props.setLoginStatus(true);
    }
  }
  async componentDidUpdate() {
    let data = await fetchJson("admin/checklogin");
    if(!data.ok) {
      this.props.history.push("/login");
    } else {
      this.props.setLoginStatus(true);
    }
  }
  render() {
    return (
      <>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Banner} />
      </>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {
  setLoginStatus
})(App);
