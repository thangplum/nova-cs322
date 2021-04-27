import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ParticipantNav from "../../components/Navbar/ParticipantNav";
import Dashboard from "./Dashboard";

const ParticipantRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <div id="research-routes-page" className="main-container">
      <ParticipantNav />
      <Switch>
        <Route exact path={`${path}/`}>
          <Dashboard />
        </Route>
        {/* <Route path={`${path}/add-new`}>
          <AddNewStudies />
        </Route> */}
      </Switch>
      
    </div>
  );
};

export default ParticipantRoutes