
// FormData: 放置表单信息的容器
// fetch: 原生请求，性能高，简单封装
// Axios: 封装好的网络请求库
// websocket: 双向，全双工通信，服务器可直接推送数据

// fetch
// 1. json(): 解析普通数据
// 2. arrayBuffer(): 解析成二进制数组
// 3.  formdata(): 返回表单
// 4. blob(): 不解析
// 5. text(): 生成文本

(async () => {
  try {
    let res = await fetch("public/user.txt");
    let data = await res.json();
    console.log(data);
  } catch(e) {
    console.error(e);
  }
})();

// import fetchJson from "./utils/fetchJson";

// (async () => {
//   let data = await fetchJson("/api/userlist");
//   console.log(data);
// })();

// let form = new FormData();
// form.append("user", "gkx");
// form.append("password", "123456");

// (async () => {
//   let data = await fetchJson("/api/adduser", {
//     method: "POST",
//     body: form
//   });
//   console.log(data);
// })();

// (async () => {
//   let data = await fetchJson("/api/userlist");
//   console.log(data);
// })();


// 引入store方法
import { createStore } from "redux";

// 创建reducer方法
function reducer(state={name: "gkx", age: 18}, action) {
  console.log(state, action)
  switch (action.type) {
    case "add":
      return {...state, age: state.age+action.count}
    case "red":
      return {...state, age: state.age-action.count}
    default: 
      return state;
  }
}
// console.log(reducer)
let store = createStore(reducer);
// 订阅状态
// store.subscribe(() => 
//   console.log(store.getState())
// );

store.dispatch({
  type: "add",
  count: 3
});

store.dispatch({
  type: "red",
  count: 5
});


// store.subscribe(() =>
//   console.log(store.getState())
// );
// console.log(store.getState());

<!-- React-Redux -->
<!-- 
  Provider,包裹
  connect,连接
  reducer
 -->
 