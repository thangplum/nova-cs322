import { LOGIN, LOGOUT, ADD_NEW } from "../constants/action-types";

export function login(payload) {
  return { type: LOGIN, payload };
}

export function logout(payload) {
  return { type: LOGOUT, payload };
}

export function addNew(payload) {
  return { type: ADD_NEW, payload };
}