import { LOGIN, LOGOUT } from "../constants/action-types";

const initialState = {
  login: false,
  name: "",
  email: "",
  image: ""
};

function rootReducer(state = initialState, action) {
  if (action.type === LOGIN) {
    return {
      login: true,
      name: action.payload.name,
      email: action.payload.email,
      image: action.payload.image
    }
  } else if (action.type === LOGOUT) {
    return {
      login: false,
      name: "",
      email: "",
      image: ""
    }
  }
};

export default rootReducer;
