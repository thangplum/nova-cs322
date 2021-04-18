import { LOGIN, LOGOUT } from "../constants/action-types";

export function login(payload) {
  return { type: LOGIN, payload };
}


export function logout(payload) {
  return { type: LOGOUT, payload };
}
