import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Timeslots = () => {
  const CALENDAR_ID = 'c_fo78t9k5qf3atuv5dujmmcl21g@group.calendar.google.com';
  const API_KEY = 'key'
  let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;

  const handleFetchEvents = () => {
    axios.get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => error)
  }


  return (
    <div>
      <Button onClick={handleFetchEvents}>Click to get events</Button>
    </div>
  );
}

export default Timeslots;