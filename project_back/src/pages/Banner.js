import React, {Component} from "react";
import { connect } from "react-redux";
import Table from "../components/table/Table";
import Dialog from "../components/dialog/Dialog";
import Nav from "../components/nav/Nav";
import Form from "../components/form/Form";
import fetchJson from "../utils/fetchJson";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceList: [],
      current: 3,
      updateId: 0,
      deleteId: 0,
      defalutValue: {title: "", sub_title: ""},
      createFormVisible: false,
      updateFormVisible: false,
      confirmVisable: false
    }
    this.createFormRef = React.createRef();
    this.updateFormRef = React.createRef();
  }
  async componentDidMount() {
    await this.getAllCarsInfo();
  }
  // 获取所有车辆信息并刷新表格
  async getAllCarsInfo() {
    let res = await fetchJson("api/banner");
    if(res.ok) {
      this.setState({
        sourceList: res.data
      });
    } else {
      alert("请求数据错误，请刷新重试！");
    }
  }
  // 打开新增页面
  openDialog() {
    this.setState({
      createFormVisible: true
    })
  }
  // 增加车辆信息
  async create() {
    console.log(this.createFormRef.current.getFormRef());
    let form = new FormData(this.createFormRef.current.formRef.current);
    console.log(this.createFormRef.current)
    let data = await fetchJson("api/banner", {
      method: "POST",
      body: form
    });
    // console.log(this.updateFormRef.current.formRef.current)
    if(data.ok) {
      alert("添加成功");
      this.getAllCarsInfo();
      this.setState({createFormVisible: false});
    } else {
      alert("添加失败");
    }
  }
  // 删除车辆信息
  async delete(id) {
    this.setState({
      confirmVisable: true,
      deleteId: id
    });
  }
  // 修改车辆信息
  update(id) {
    let arr = this.state.sourceList.filter(listItem => listItem.ID === id);
    this.setState({
      updateId: id,
      updateFormVisible: true,
      defalutValue: arr[0]
    });
  }
  // 发送修改网络请求
  async sendUpdate() {
    let form = new FormData(this.updateFormRef.current.formRef.current);
    try {
      let data = await fetchJson(`api/banner/${this.state.updateId}`, {
        method: "POST",
        body: form
      });
      if(data.ok) {
        alert("修改成功");
        this.getAllCarsInfo();
        this.setState({updateFormVisible: false});
      } else {
        alert("修改失败");
      }
    } catch (e) {
      console.log("错误", e);
    }
  }
  // 取消dialog
  cancelCreateForm() {
    this.setState({createFormVisible: false});
  }
  cancelUpdateForm() {
    this.setState({updateFormVisible: false});
  } 
  cancelConfirm() {
    this.setState({confirmVisable: false});
  }
  changeTab(index) {
    if(index === 1) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/car");
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
          defaultCurrent={1}
          onChange={(index) => {this.changeTab(index)}}
        />
        <Dialog
          visible={this.state.createFormVisible}
          onCancel={this.cancelCreateForm.bind(this)}
          width="500"
          title="新增车辆信息"
          modal={true}
          deleteBtn={true}
          style={{position: "absolute", left: "300px", top: "300px", zIndex: "1000"}}
        >
          <Form
            width="400"
            fields={[
              {type: "text", name: "title", placeholder: "请输入车辆名称", label: "车辆名称："},
              {type: "text", name: "sub_title", placeholder: "请输入车辆类型", label: "车辆类型："},
              {type: "file", name: "image", placeholder: "请选择车辆图片", label: "车辆图片："}
            ]}
            btns={[
              {type: "button", value: "确认", onClick: this.create.bind(this)},
              {type: "reset", value: "重置"}
            ]}
            ref={this.createFormRef}
          />
        </Dialog>
        <Dialog
          visible={this.state.updateFormVisible}
          onCancel={this.cancelUpdateForm.bind(this)}
          width="500"
          title="修改车辆信息"
          modal={true}
          deleteBtn={true}
          style={{position: "absolute", left: "300px", top: "300px", zIndex: "1000"}}
        >
          <Form
            width="400"
            fields={[
              {
                type: "text", 
                name: "title", 
                placeholder: "请输入车辆名称", 
                label: "车辆名称：", 
                defaultValue: this.state.defalutValue.title
              },
              {
                type: "text", 
                name: "sub_title", 
                placeholder: "请输入车辆类型", 
                label: "车辆类型：",
                defaultValue: this.state.defalutValue.sub_title
              },
              {
                type: "file", 
                name: "image", 
                placeholder: "请选择车辆图片", 
                label: "车辆图片："
              }
            ]}
            btns={[
              {type: "button", value: "确认", onClick: this.sendUpdate.bind(this)},
              {type: "reset", value: "重置"}
            ]}
            ref={this.updateFormRef}
          />
        </Dialog>
        <Dialog
          width="300"
          title="确认信息"
          visible={this.state.confirmVisable}
          onCancel={this.cancelConfirm.bind(this)}
          modal={true}
          style={{position: "absolute", left: "300px", top: "300px", zIndex: "1000"}}
        >
          <div className="panel-body">
            是否确认删除？
          </div>
          <div style={{float: "right"}}>
            <button className="btn btn-warning" onClick={async () => {
              await fetchJson(`api/banner/${this.state.deleteId}`, {
                method: "DELETE"
              });
              this.setState({
                confirmVisable: false
              });
              await this.getAllCarsInfo();
            }}>确认</button>&nbsp;
            <button className="btn btn-default" onClick={() => this.cancelConfirm()}>取消</button>
          </div>
        </Dialog>
        <Dialog
          width="1200"
          title="车辆信息"
        >
          <button 
            className="btn btn-primary" 
            onClick={this.openDialog.bind(this)}
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
                title: "车辆类型",
                dataIndex: "sub_title",
                key: "sub_title"
              },
              {
                title: "图片",
                dataIndex: "image",
                key: "image"
              }
            ]}
            checkbox={true}
            options={[
              {type: "primary", value: "修改", onClick: this.update.bind(this)},
              {type: "danger", value: "删除", onClick: this.delete.bind(this)}
            ]}
          />
        </Dialog>
      </>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {})(Banner);
