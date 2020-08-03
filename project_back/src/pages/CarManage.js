import React, {Component} from "react";
import Nav from "../components/nav/Nav";
import Dialog from "../components/dialog/Dialog";
import Form from "../components/form/Form";
import Table from "../components/table/Table";
import fetchJson from "../utils/fetchJson";

class CarManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceList: []
    }
  }
  changeTab(index) {
    if(index === 1) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/car");
    }
  }
  async componentDidMount() {
    try {
      let res = await fetchJson("/api/carlist/10");
      if(res.ok) {
        console.log(res.data)
        this.setState({
          sourceList: res.data
        });
      } else {
        alert("请求数据出错，请刷新重试");
        console.log(res);
      }
    } catch (e) {
      console.log("错误", e);
    }
  }
  render() {
    return (
      <>
        <Nav 
          fields={[
            {id: 1,text: "焦点图"},
            {id: 2,text: "车辆管理"}
          ]}
          defaultCurrent={2}
          onChange={(index) => {this.changeTab(index)}}
        />
        <Dialog
          width="1200"
          title="车辆管理"
        >
          <button 
            className="btn btn-primary" 
          >
            新增
          </button>
          <Table
            width="1000"
            sourceList={this.state.sourceList}
            columns = {[
              {
                title: "序号",
                dataIndex: "ID",
                key: "ID"
              },
              {
                title: "车辆名称",
                dataIndex: "title",
                key: "title"
              },
              {
                title: "行驶里程",
                dataIndex: "distance",
                key: "distance"
              },
              {
                title: "排量",
                dataIndex: "mileage",
                key: "mileage"
              },
              {
                title: "挡位",
                dataIndex: "shift",
                key: "shift"
              },
              {
                title: "上牌时间",
                dataIndex: "purchase_time",
                key: "purchase_time"
              },
              {
                title: "价格",
                dataIndex: "price",
                key: "price"
              }
            ]}
            checkbox={true}
            options={[
              {type: "primary", value: "修改", onClick: ()=>{}},
              {type: "danger", value: "删除", onClick: ()=>{}}
            ]}
          />
        </Dialog>
      </>
    );
  }
}

export default CarManage;
