import { combineReducers } from 'redux'
import addAppointmentSlots from './addAppointmentSlots';

export default combineReducers({
  addAppointment: addAppointmentSlots
})
