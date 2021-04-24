import React, { useEffect, useState } from "react";
import { Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Login from '../Login';
import LogoutDropdown from "./logoutDropdown";

const NavBar =  () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userInfo');
    if (loggedInUser) {
      setIsLogin(true);
    }
  }, [])

  return (
    <Navbar style={{ marginBottom: "20px" }} expand="lg">
      <Navbar.Brand>
        <NavLink to="/">Fake Nova</NavLink>
      </Navbar.Brand>
      {isLogin && <NavLink to="/dashboard">Dashboard</NavLink>}
      <Navbar.Collapse className="justify-content-end">
        {isLogin ? <LogoutDropdown setLogin={setIsLogin} /> : <Login setLogin={setIsLogin} />}
      </Navbar.Collapse>

    </Navbar>
  );
}

export default NavBar;
