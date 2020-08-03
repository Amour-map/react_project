import React, {Component} from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.fields
    }
    this.formRef = React.createRef();
  }
  getFormRef() {
    return this.formRef;
  }
  render() {
    return (
      <>
        <form ref={this.formRef}>
          {this.state.fields ? this.state.fields.map((field, index) => {
            let id = "id_"+Math.floor(Math.random()*10000000);
            return (
              <div 
                className="input-group" 
                key={index}  
                style={{width: this.props.width ? this.props.width + "px" : "400px"}}
              >
                <label htmlFor={field.id}>{field.label}</label>
                <input 
                  type={field.type}
                  defaultValue={field.defaultValue ? field.defaultValue : ""}
                  id={id}
                  name={field.name}
                  className="form-control"
                  placeholder={field.placeholder}
                />
              </div>
            )
          }) : ""
          }
          {
            this.props.btns ? this.props.btns.map((btn, index) => {
              return (
                <button 
                  type={btn.type} 
                  className="btn btn-default"
                  key={index}
                  onClick={btn.onClick ? btn.onClick : ()=>{}}
                  style={{margin: "10px 10px 0 0"}}
                >
                  {btn.value}
                </button>
              )
            }) : ""
          }
        </form>
      </>
    );
  }
}

export default Form;
