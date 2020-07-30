import { LOGIN_STATUS } from "../action";

export default function loginInfo(state=false, action) {
  switch (action.type) {
    case LOGIN_STATUS:
      return action.status;
    default:
      return state;
  }
}
