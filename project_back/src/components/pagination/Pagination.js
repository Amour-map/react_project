import React, {Component} from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {
            Array.from(new Array(this.props.total)).map((value, index) => {
              return (
                <li key={index} className={this.props.current === index + 1 ? "active" : ""}>
                  <a 
                    href="#" 
                    onClick={this.props.changeCurrent ? () => this.props.changeCurrent(index+1) : ()=>{}}
                  >
                    {index+1}
                  </a>
                </li>
              )
            })
          }
          <li>
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
