import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ProtectedRoutes from '../components/ProtectedRoutes';
import StudentDashboard from '../pages/StudentDashboard';
import ResearcherDashboard from '../pages/ResearcherDashboard';
import InstructorDashboard from '../pages/InstructorDashboard';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <ProtectedRoutes exact path='/dashboard'>
        <Dashboard/>
      </ProtectedRoutes>
      <ProtectedRoutes path='/dashboard/student'>
        <StudentDashboard />
      </ProtectedRoutes>
      <ProtectedRoutes path='/dashboard/researcher'>
        <ResearcherDashboard />
      </ProtectedRoutes>
      <ProtectedRoutes path='/dashboard/instructor'>
        <InstructorDashboard />
      </ProtectedRoutes>
    </Switch>
  );
}
