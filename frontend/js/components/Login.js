import React from 'react';
import { connect } from "react-redux";
import { login } from "../actions/index";
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '873248028985-p190or8fqsjmtst0b2re4acatrogi8dq.apps.googleusercontent.com';

function Login({ setLogin, login }) {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    localStorage.setItem('userInfo', JSON.stringify(res.profileObj));
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    const loginInfo = {name: res.profileObj.name, email: res.profileObj.email, image: res.profileObj.imageUrl};

    login(loginInfo);
    setLogin(true);

    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Login);

function mapDispatchToProps(dispatch) {
  return {
    login: loginInfo => dispatch(login(loginInfo))
  };
}
