import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ResearchNav from "../../components/Navbar/ResearchNav";
import ResearcherDashboard from './ResearcherDashboard';
import AddNewStudies from "./AddNewStudies";
import AddAppointment from './AddAppointment';

const ResearchRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <div id="research-routes-page" className="main-container">
      <ResearchNav />
      <Switch>
        <Route exact path={`${path}`}>
          <ResearcherDashboard />
        </Route>
        <Route path={`${path}/add-new`}>
          <AddNewStudies />
        </Route>
        <Route path={`${path}/add-appointment`}>
          <AddAppointment />
        </Route>
      </Switch>
      
    </div>
  );
};

export default ResearchRoutes