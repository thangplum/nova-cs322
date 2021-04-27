import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouteMatch } from "react-router-dom";

const ParticipantNav =  () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Navbar style={{ marginBottom: "20px"}} expand="lg">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} to={`${path}`}><FontAwesomeIcon style={{ marginRight: '5px'}} icon={faHome} /></NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/current-studies`}>Available Studies</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/`}>My schedules</NavLink>
          </Nav>
          <Form inline>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={"/logout"}>
              Logout
              <FontAwesomeIcon style={{ marginLeft: '5px'}} icon={faSignOutAlt} />
            </NavLink>
          </Form>
          
        </Navbar.Collapse>
        
      </Navbar>
    </>
    
  );
}

export default ParticipantNav;
