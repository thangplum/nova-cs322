import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import InstructorRoutes from '../pages/Instructor';
import ResearchRoutes from '../pages/Researcher';
import ParticipantRoutes from '../pages/Participant';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path='/dashboard'>
        <Dashboard/>
      </Route>
      <Route path='/participant'>
        <ParticipantRoutes />
      </Route>
      <Route path='/researcher'>
        <ResearchRoutes />
      </Route>
      <Route path='/instructor'>
        <InstructorRoutes />
      </Route>
    </Switch>
  );
}
