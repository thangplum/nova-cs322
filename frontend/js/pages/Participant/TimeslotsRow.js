import React from 'react';
import { DateTime } from 'luxon';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TimeslotsRow = ({ startDate, endDate, link }) => {
  const sDate = DateTime.fromISO(startDate);
  const eDate = DateTime.fromISO(endDate);
  const date = sDate.toLocaleString(DateTime.DATE_HUGE);
  const startTime = sDate.toLocaleString(DateTime.TIME_SIMPLE); 
  const endTime = eDate.toLocaleString(DateTime.TIME_SIMPLE);

  return (
    <tr>
      <td>
        {/* <h5>{typeof slots[0].start.dateTime}</h5> */}
        <h6><span style={{ fontWeight: '600' }}>Date: </span>{date}</h6>
        <h6><span style={{ fontWeight: '600' }}>Start time: </span>{startTime}</h6>
        <h6><span style={{ fontWeight: '600' }}>End time: </span>{endTime}</h6>
      </td>
      <td style={{ verticalAlign: "middle" }}>
        <Link to={{ pathname: link }} target="_blank">
          <Button style={{ width: '100%' }}>
            Reserve
          </Button>
        </Link>
      </td>
    </tr>
  );
}

export default TimeslotsRow;