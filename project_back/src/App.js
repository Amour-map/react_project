import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { setLoginStatus } from "./store/action";
import Login from "./pages/Login";
import Banner from "./pages/Banner";
import CarManage from "./pages/CarManage";
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
      !this.props.loginStatus && this.props.setLoginStatus(true);
    }
  }
  async componentDidUpdate() {
    let data = await fetchJson("admin/checklogin");
    if(!data.ok) {
      let loginPath = /#\/login$/
      if(!loginPath.test(location.hash)) {
        this.props.history.push("/login");
      }
      this.props.loginStatus && this.props.setLoginStatus(false);
    } else {
      !this.props.loginStatus && this.props.setLoginStatus(true);
    }
  }
  render() {
    return (
      <>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Banner} />
        <Route path="/car" component={CarManage} />
      </>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {
  setLoginStatus
})(App);
