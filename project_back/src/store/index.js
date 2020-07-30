import { createStore, combineReducers } from "redux";

import loginInfo from "./reducer/loginInfo";

export default createStore(combineReducers({
  loginInfo
}));
