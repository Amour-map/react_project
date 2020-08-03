import React, {Component} from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.defaultCurrent || 1,
      total : this.props.total || 10,
      onChange: this.props.onChange || undefined
    }
  }
  render() {
    console.log(this.state.current);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li onClick={() => {
            if(this.state.current !== 1) {
              this.setState({
                current: this.state.current-1
              });
            }
          }}>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {
            Array.from(new Array(this.state.total)).map((value, index) => {
              return (
                <li 
                  key={index} 
                  className={this.state.current === index + 1 ? "active" : ""}
                  onClick={() => {
                    this.setState({
                      current: index + 1
                    });
                    this.state.onChange ? this.state.onChange(index+1) : "";
                  }}
                >
                  <a href="#">
                    {index+1}
                  </a>
                </li>
              )
            })
          }
          <li onClick={() => {
            if(this.state.current !== this.state.total) {
              this.setState({
                current: this.state.current+1
              });
            }
          }}>
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
