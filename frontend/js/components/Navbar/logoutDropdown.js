import React, { useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import Logout from '../Logout';

const LogoutDropdown = ({ setLogin }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
  const LogoutToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={LogoutToggle} id="logout-toggle">
        {loggedInUser.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Logout setLogin={setLogin} />
      </Dropdown.Menu>
    </Dropdown>
  );
}

// const mapStateToProps = state => {

//   return {
//     name: state.name
//   };
// };

// export default connect(
//   mapStateToProps
// )(LogoutDropdown);

export default LogoutDropdown;
