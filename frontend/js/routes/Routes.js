import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ProtectedRoutes from '../components/ProtectedRoutes';
import StudentDashboard from '../pages/StudentDashboard';
import InstructorDashboard from '../pages/InstructorDashboard';
import ResearchRoutes from '../pages/Researcher/index';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <ProtectedRoutes exact path='/dashboard'>
        <Dashboard/>
      </ProtectedRoutes>
      <ProtectedRoutes path='/participant'>
        <StudentDashboard />
      </ProtectedRoutes>
      <ProtectedRoutes path='/researcher'>
        <ResearchRoutes />
      </ProtectedRoutes>
      <ProtectedRoutes path='/instructor'>
        <InstructorDashboard />
      </ProtectedRoutes>
    </Switch>
  );
}
