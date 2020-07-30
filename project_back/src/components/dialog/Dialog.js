import React, {Component} from "react";
import "./dialog.css";

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  render() {
    return (
      <>
        {
          this.state.visible || (this.props.visible === undefined ? true : this.props.visible) ? 
          <>
            {this.props.modal ? <div className="modal-visable"></div> : ""}
              <div 
                style={{
                  width: this.props.width ? this.props.width + "px" : "400px", 
                  ...this.props.style
                }}
                className="panel panel-default"
              >
                <div className="panel-heading">
                  <h3 className="panel-title">
                    {this.props.title}
                    {this.props.deleteBtn ? 
                    <span 
                      className="glyphicon glyphicon-remove" 
                      style={{float: "right"}}
                      onClick={this.props.onCancel}
                    >
                    </span> : ""}
                  </h3>
                </div>
                <div className="panel-body">
                  {this.props.children}
                </div>
              </div>
          </> : ""
        }
      </>
    );
  }
}

export default Dialog;
