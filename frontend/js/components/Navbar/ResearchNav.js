import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Login from '../Login';
import LogoutDropdown from "./logoutDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouteMatch } from "react-router-dom";

const ResearchNav =  () => {
  const [isLogin, setIsLogin] = useState(false);
  const {path} = useRouteMatch();
  

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userInfo');
    if (loggedInUser) {
      setIsLogin(true);
    }
  }, [])

  return (
    <>
      <Navbar style={{ marginBottom: "20px"}} expand="lg">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} to={`${path}`}><FontAwesomeIcon style={{ marginRight: '5px'}} icon={faHome} /></NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/`}>My studies</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to="/">All studies</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to={`${path}/add-new`}>Add new study</NavLink>
            <NavLink style={{ textDecoration: "none", marginRight: "20px" }} className="link" to="/">Prescreen results</NavLink>
          </Nav>
          {/* <Form inline>
            {isLogin ? <LogoutDropdown setLogin={setIsLogin} /> : <Login setLogin={setIsLogin} />}
          </Form> */}
          
        </Navbar.Collapse>
        
      </Navbar>
    </>
    
  );
}

export default ResearchNav;
