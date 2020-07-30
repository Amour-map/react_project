import React, {Component} from "react";
import { connect } from "react-redux";
import { setLoginStatus } from "../store/action";
import Dialog from "../components/dialog/Dialog";
import Form from "../components/form/Form";
import fetchJson from "../utils/fetchJson";

class Login extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  async submit() {
    let form = new FormData(this.formRef.current.formRef.current);
    let data = await fetchJson("admin/login", {
      method: "POST",
      body: form
    });
    if(data.ok) {
      this.props.setLoginStatus(true);
      this.props.history.push("/banner");
    } else {
      alert("登录失败，请刷新重试")
      console.log("登录失败，请刷新重试");
    }
  }
  render() {
    return (
      <div style={{width: "400px", margin: "200px auto"}}>
        <Dialog
          width="500"
          title="后台管理系统"
          modal={false}
          deleteBtn={false}
        >
          <Form
            width="400"
            fields={[
              {type: "text", id: "username", name: "username", placeholder: "请输入用户名", label: "用户名："},
              {type: "password", id: "password", name: "password", placeholder: "请输入密码", label: "密码："}
            ]}
            btns={[
              {type: "button", value: "登录", onClick: this.submit.bind(this)},
              {type: "reset", value: "重置"}
            ]}
            ref={this.formRef}
          />
        </Dialog>
      </div>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {
  setLoginStatus
})(Login);
