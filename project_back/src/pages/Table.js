import React, {Component} from "react";
// import fetchJson from "../utils/fetchJson";
import { connect } from "react-redux";

class Table extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
      </>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {})(Table);
