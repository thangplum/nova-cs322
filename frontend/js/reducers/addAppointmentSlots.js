import { ADD_APPOINTMENTS } from '../constants/index';

const initialState = {
  slots : []
};

export default function addAppointmentSlots(state = initialState, action) {
  switch (action.type) {
    case ADD_APPOINTMENTS:
      return {
        ...state,
        slots: action.payload
      };
    default:
      return state;
  }
}
