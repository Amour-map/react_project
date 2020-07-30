export const LOGIN_STATUS ="login_status";

export function setLoginStatus(status) {
  return {
    type: LOGIN_STATUS,
    status
  }
}
