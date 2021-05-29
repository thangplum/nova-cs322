import React, { useState } from "react";
import { Navbar, Nav, Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouteMatch } from "react-router-dom";
import ProfileModal from "../ResearcherDashboard/profileModal";

const ResearchNav =  () => {
  const {path} = useRouteMatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const logout = () => {
    window.location.href = "/logout";
  }

  return (
    <>
      <Navbar style={{ marginBottom: "20px"}} expand="lg">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} to={`${path}`}><FontAwesomeIcon style={{ marginRight: '5px'}} icon={faHome} /></NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/my-researches`}>My studies</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/all-researches`}>All studies</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/add-new`}>Add new study</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to="/">Prescreen results</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to="/dashboard">Dashboard</NavLink>
          </Nav>
          <Form inline>
            <a style={{ textDecoration: "none", marginRight: "20px" }} className="link" onClick={handleShow}>
              My profile
            </a>
            <a style={{ textDecoration: "none", marginRight: "20px" }} className="link" onClick={logout}>
              Log out
              <FontAwesomeIcon style={{ marginLeft: '5px'}} icon={faSignOutAlt} />
            </a>
          </Form>
          <ProfileModal show={show} handleClose={handleClose} />
        </Navbar.Collapse>
        
      </Navbar>
    </>
    
  );
}

export default ResearchNav;
