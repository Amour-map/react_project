import React, {Component} from "react";

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  change(index) {
    this.props.onChange(index);
  }
  render() {
    return (
      <ul className="nav nav-tabs">
        {
          this.props.fields.map((field, index) => (
          <li 
            key={field.id} 
            role="presentation" 
            className={this.props.defaultCurrent === index+1 ? "active" : ""}
            onClick={() => this.change(index+1)}
          >
            <a href="javascript:;">{field.text}</a>
          </li>
          ))
        }
      </ul>
    );  
  }
}

export default Nav;
