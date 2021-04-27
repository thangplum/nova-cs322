import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import StudentDashboard from '../pages/StudentDashboard';
import InstructorDashboard from '../pages/InstructorDashboard';
import ResearchRoutes from '../pages/Researcher/index';

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
        <StudentDashboard />
      </Route>
      <Route path='/researcher'>
        <ResearchRoutes />
      </Route>
      <Route path='/instructor'>
        <InstructorDashboard />
      </Route>
    </Switch>
  );
}
