import { ADD_NEW } from "../constants/action-types";

export default function addNew(state = {}, action) {
  switch (action.type) {
    case ADD_NEW:
      return action.payload;
    default:
      return state;
  }
}