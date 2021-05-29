import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Form } from 'react-bootstrap'
import { NavLink, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import getCookieToken from '../../utils/getCookieToken';

import ProfileModal from '../ParticipantDashboard/profileModal'

const ParticipantNav =  () => {
  const { path } = useRouteMatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    window.location.href = "/logout";
  }

  useEffect(() => {
    var csrftoken = getCookieToken('csrftoken');

    axios.get('/api/profile/', {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        if (response.data.name === '') {
          setShow(true);
        }
      }
    ).catch (
      error => console.log(error)
    )
  }, [])

  return (
      <Navbar style={{ marginBottom: "20px"}} expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} to={`${path}`}><FontAwesomeIcon style={{ marginRight: '5px'}} icon={faHome} /></NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/all-studies`}>Available Studies</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/my-schedule`}>My schedules</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to="/dashboard">Dashboard</NavLink>
          </Nav>
          <Form inline>
            <a style={{ textDecoration: "none", marginRight: "20px" }} className="link" onClick={handleShow}>
              My profile
            </a>
            <a onClick={logout} style={{ textDecoration: "none", marginRight: "20px" }} className="link">
              Log out
              <FontAwesomeIcon style={{ marginLeft: '5px'}} icon={faSignOutAlt} />
            </a>
          </Form>
          <ProfileModal show={show} handleClose={handleClose} />
        </Navbar.Collapse>
        
      </Navbar>

    
  );
}

export default ParticipantNav;
