import React from 'react';
import { connect } from "react-redux";
import { logout } from "../actions/index";

import { useHistory } from "react-router-dom";

import { GoogleLogout } from 'react-google-login';

const clientId = '873248028985-p190or8fqsjmtst0b2re4acatrogi8dq.apps.googleusercontent.com';


function Logout({ setLogin, logout }) {
  const history = useHistory();

  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    setLogin(false);
    history.push('/');
    const loginInfo = {name: "", email: "", image: ""};
    localStorage.clear();
    logout(loginInfo);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);

function mapDispatchToProps(dispatch) {
  return {
    logout: loginInfo => dispatch(logout(loginInfo))
  };
}
