import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ProfileModal = ({ show, handleClose }) => {
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    age: '',
    ethnicity: '', 
    race: ''
  })

  function handleChange(e) {
    let value = e.target.value;
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: value
    })
    console.log(profileInfo);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>My profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="profileFullname">
            <Form.Label>Full name</Form.Label>
            <Form.Control 
              type="text" 
              name='name' 
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="profileAge">
            <Form.Label>Age</Form.Label>
            <Form.Control 
              type="number" 
              name='age'
              onChange={handleChange}
            />
          </Form.Group>

          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} style={{ paddingTop: "0px"}}>
                Gender
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="profileGender"
                  id="male"
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="profileGender"
                  id="female"
                />
                <Form.Check
                  type="radio"
                  label="Not specified"
                  name="profileGender"
                  id="NA"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <fieldset>
            <Form.Group as={Row} controlId="profileEthinicty">
              <Form.Label as="legend" column sm={2} style={{ paddingTop: "0px"}}>
                Ethinicty
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Hispanic or Latino"
                  name="hispanic"
                  id="hispanic"
                />
                <Form.Check
                  type="radio"
                  label="Not Hispanic or Latino"
                  name="not hispanic"
                  id="not hispanic"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group controlId="profileRace">
            <Form.Label>Race</Form.Label>
            <Form.Control as="select" multiple>
              <option value="American Indian">
                American Indian or Alaska Native
              </option>
              <option value="Asian">
                Asian
              </option>
              <option value="African American">
                Black or African American
              </option>
              <option value="Native Hawaiian">
                Native Hawaiian or Other Pacific Islander
              </option>
              <option value="White">
                White
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;