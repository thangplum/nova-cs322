import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home';
import Calender from '../pages/Calender';
import ProtectedRoutes from '../components/ProtectedRoutes';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <ProtectedRoutes path='/calender'>
        <Calender />
      </ProtectedRoutes>
    </Switch>
  );
}
