import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import getCookieToken from '../../utils/getCookieToken';


const TimeslotModal = ({ id, show, handleClose }) => {
  const [calendarId, setCalendarId] = useState('');

  var csrftoken = getCookieToken('csrftoken');

  useEffect(() => {
    const fetchResearch = async () => {
      //var csrftoken = getCookieToken('csrftoken');
      if (id !== '') {
        const res = await axios.get(`/api/form/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken
          }
        })
        setCalendarId(res.data.link);
      }
    }
    
    fetchResearch();
  }, [id])

  function handleChange(evt) {
    let value = evt.target.value;
    
    setCalendarId(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if research name is empty
    if (calendarId === "") {
      alert("Please put in your appointment calender ID");
      return ;
    } else if (!calendarId.includes('@group.calendar.google.com') && !calendarId.includes('@knox.edu')) {
      alert("Please put in a valid appointment calender ID");
      return ;
    }

    axios.patch(`/api/form/${id}/`, {link: calendarId}, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        if(confirm("You have successfully changed your Google Calendar ID.")) {
          handleClose();
        }
      }
    ).catch (
      error => console.log(error)
    )
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>Research Information</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="calendarId">
              <Form.Label column sm={2}>
                Calender ID *
              </Form.Label>
              <Form.Control name="link" type="text" value={calendarId} onChange={handleChange} />
            </Form.Group>
            
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TimeslotModal;