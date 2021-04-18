import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute({ children, path }) {
  const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <Route path={path} render={({ location }) => {
      return loggedInUser !== null
        ? children
        : <Redirect to={{
            pathname: '/',
            state: { from: location }
          }} />
    }} />
  )
}

export default ProtectedRoute;
