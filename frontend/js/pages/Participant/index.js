import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ParticipantNav from "../../components/Navbar/ParticipantNav";
import Dashboard from "./Dashboard";
import CurrentStudies from "./CurrentStudies";

const ParticipantRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <div id="research-routes-page" className="main-container">
      <ParticipantNav />
      <Switch>
        <Route exact path={`${path}`}>
          <Dashboard />
        </Route>
        <Route path={`${path}/current-studies`}>
          <CurrentStudies />
        </Route>
      </Switch>
      
    </div>
  );
};

export default ParticipantRoutes