import React, {Component} from "react";

class Table extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table 
        className="table table-striped table-bordered table-hover"
        style={{width: this.props.width ? this.props.width + "px" : "1000px"}}
      >
        <thead>
          <tr>
            {this.props.checkbox ? <th>
              <input type="checkbox" />
            </th> : ""}
            {
              this.props.columns.map(column => (<th key={column.key}>{column.title}</th>))
            }
            {
              this.props.options ? <th>操作</th> : ""
            }
          </tr>
        </thead>
        <tbody>
          {
            this.props.sourceList.length === 0 ? <tr></tr> :
            this.props.sourceList.map((listItem, index) => {
              return (
                <tr key={index}>
                  {this.props.checkbox ? <td>
                    <input type="checkbox" />
                  </td> : ""}
                  {this.props.columns.map((column, index) => {
                    return <td key={index}>{listItem[column.dataIndex]}</td>
                  })}
                  <td>
                    {
                      this.props.options ? this.props.options.map((option, index) => 
                        (<button 
                          key={index} 
                          className={option.type ? "btn btn-"+option.type : "btn btn-primary"}
                          onClick={() => option.onClick(listItem.ID)}
                        >
                          {option.value}
                        </button>)
                      ) : ""
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
