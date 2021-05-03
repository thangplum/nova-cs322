import React from "react";
import { Navbar, Form, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const NavBar =  () => {

  return (
    <Navbar style={{ marginBottom: "20px" }} expand="lg">
      <Nav style={{ alignItems: "center" }} className="mr-auto">
        <Navbar.Brand>
          <NavLink to="/">Fake Nova</NavLink>
        </Navbar.Brand>
        <NavLink style={{ textDecoration: "none", marginRight: "20px" }} to="/dashboard">Dashboard</NavLink>
      </Nav>
      
      <Form inline>
        <a href="logout">
          Log out
          <FontAwesomeIcon style={{ marginLeft: '5px'}} icon={faSignOutAlt} />
        </a>
      </Form>
      
    </Navbar>
  );
}

export default NavBar;
