import { ADD_APPOINTMENTS } from '../constants';

export function addNewAppointmentSlots(payload) {
  return { type: ADD_APPOINTMENTS, payload };
}