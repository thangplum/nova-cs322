import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import getCookieToken from '../../utils/getCookieToken';

const AddAppointment = () =>  {
  const [researchInfo, setInfo] = useState(JSON.parse(localStorage.getItem("researchInfo")));
  const csrftoken = getCookieToken('csrftoken');

  function handleChange(e) {    
    let value = e.target.value;
    setInfo({
      ...researchInfo,
      link: value
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    // TODO: Verify link is a proper google form link or and Calender ID
    if (researchInfo.link === "") {
      alert("Please put in your appointment link");
    }

    axios.post('/api/form/', researchInfo, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        if(confirm("You have successfully created a new research")) {
          localStorage.clear();
          window.location.href = "/researcher";
        }
      }
    ).catch (
      error => console.log(error)
    )
  } 

  return (
    <div id="add-appointment-page">
      <Card className="db-card" id="info">
        <Card.Header id="card-header">Appointment Information</Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} controlId="appointmentInput">
              <Form.Label column sm={2}>
                Calender Link *
              </Form.Label>
              <Col sm={10}>
                <Form.Control name="link" type="text" value={researchInfo.appointment} onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="appointmentSubmit">
              <Col md={{ span: 10, offset: 2 }}>
                <Button type="submit" variant="success" size="lg">
                  Add this study
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddAppointment;