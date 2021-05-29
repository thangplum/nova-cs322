import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, Table, Button } from 'react-bootstrap';
import getCookieToken from "../../utils/getCookieToken";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addNewAppointmentSlots } from '../../actions';

const CurrStudy = () => {
  const { id } = useParams();
  let history = useHistory();
  let location= useLocation();
  const dispatch = useDispatch();

  const [apiKey, setApiKey] = useState('');
  const [study, setStudy] = useState({});
  const [token, setToken] = useState('');
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    var csrftoken = getCookieToken('csrftoken');

    // Fetch research form info
    axios.get(`/api/form/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        const temp = response.data;
        setStudy(temp);
      }
    ).catch (
      error => console.log(error)
    )
    
    // Fetch refresh token
    axios.get(`/api/profile/token/`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        setToken(response.data.token);
        setApiKey(response.data.api_key);
      }
    ).catch (
      error => console.log(error)
    )
  }, [])

  useEffect(() => {
    const CALENDAR_ID = study.link;
    console.log(CALENDAR_ID);
    
    if (token !== '' && typeof CALENDAR_ID !== 'undefined') {
      let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?singleEvents=true&key=${apiKey}`;

      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          'singleEvents': true
        }
      }).then (
        response => {
          setSlots(response.data.items);
        }
      ).catch (
        error => console.log(error)
      )
    }
  }, [token])

  const handleBook = () => {
    dispatch(addNewAppointmentSlots(slots));
    history.push(`${location.pathname}/timeslots`);
  }
  
  return (
    <div id="curr-study-page">
      {Object.keys(study).length === 0 && study.constructor === Object ? <></> :
      <Card className="db-card" id="curr-study">
        <Card.Header as="h5" style={{ fontWeight: "600" }}>Study Information</Card.Header>
        <Card.Body>
          <Table striped bordered>
            <tbody>
              <tr style={{ height: "80px"}}>
                <th style={{ width: "20%", verticalAlign: "middle" }}>Study Name</th>
                <td>
                  <div style={{ fontWeight: "600", fontSize: "2rem" }}>{study.studyName}</div>
                </td>
              </tr>
              <tr>
                <th style={{ width: "20%"}}>Credit</th>
                <td>{study.creditsResearch} credit(s)</td>
              </tr>
              <tr>
                <th style={{ width: "20%"}}>Duration</th>
                <td>{study.duration} minutes</td>
              </tr>
              <tr>
                <th style={{ width: "20%"}}>Researcher</th>
                <td>{study.researcher}</td>
              </tr>
              <tr>
                <th>Instructor</th>
                <td>{study.instructor}</td>
              </tr>
            </tbody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {
              slots.length > 0 ?
              <Button 
                variant="success" 
                onClick={handleBook}
              >
                View timeslots for this study
              </Button> :
              <h4>There is no available timeslot left.</h4>
            }
          </div>
        </Card.Body>
      </Card>
      }
    </div>
  );
}

export default CurrStudy;