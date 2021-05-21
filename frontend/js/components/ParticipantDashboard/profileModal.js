import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import getCookieToken from '../../utils/getCookieToken';

const ProfileModal = ({ show, handleClose }) => {
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    age: '',
    ethnicity: '', 
    race: '',
    gender: '',
    email: ''
  })
  const csrftoken = getCookieToken('csrftoken');

  // Populate the modal with the current profile if user is a returning user
  useEffect(() => {
    const csrftoken = getCookieToken('csrftoken');
    axios.get(`/api/profile/`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        setProfileInfo({
          ...profileInfo,
          ...response.data
        })
      }
    ).catch (
      error => console.log(error)
    )
  }, [])

  function handleChange(e) {
    let value = e.target.value;
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: value
    })
    console.log(profileInfo);
  }

  function handleSubmit() {
    
    axios.post(`/api/profile/`, profileInfo, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        console.log(response);
        handleClose();
      }
    ).catch (
      error => console.log(error)
    )
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
              value={profileInfo.name}
              type="text" 
              name='name' 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="profileFullname">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              name='email' 
              onChange={handleChange}
              value={profileInfo.email}
            />
          </Form.Group>
          <Form.Group controlId="profileAge">
            <Form.Label>Age</Form.Label>
            <Form.Control 
              type="number" 
              name='age'
              onChange={handleChange}
              value={profileInfo.age}
            />
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} >
              <Form.Label as="legend" column sm={2} style={{ paddingTop: "0px"}}>
                Gender
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  id="male"
                  value='male'
                  onChange={handleChange}
                  checked={profileInfo.gender === 'male'}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  id="female"
                  value='female'
                  onChange={handleChange}
                  checked={profileInfo.gender === 'female'}
                />
                <Form.Check
                  type="radio"
                  label="Not specified"
                  name="gender"
                  id="NA"
                  value='NA'
                  onChange={handleChange}
                  checked={profileInfo.gender === 'NA'}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} style={{ paddingTop: "0px"}}>
                Ethnicty
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Hispanic or Latino"
                  name="ethnicity"
                  id="hispanic"
                  value='hispanic'
                  onChange={handleChange}
                  checked={profileInfo.ethnicity === 'hispanic'}
                />
                <Form.Check
                  type="radio"
                  label="Not Hispanic or Latino"
                  name="ethnicity"
                  id="not hispanic"
                  value='hispanic'
                  onChange={handleChange}
                  checked={profileInfo.ethnicity === 'not hispanic'}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group controlId="race">
            <Form.Label>Race</Form.Label>
            <Form.Control as="select" name='race' onChange={handleChange} defaultValue={profileInfo.race}>
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
        <Button variant="primary" onClick={handleSubmit}>
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