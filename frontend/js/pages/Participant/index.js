import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ParticipantNav from "../../components/Navbar/ParticipantNav";
import Dashboard from "./Dashboard";
import MySchedule from "./MySchedule";
import AllStudies from "./AllStudies";
import CurrStudy from "./CurrStudy";
import Timeslots from './Timeslots';

const ParticipantRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <div id="research-routes-page" className="main-container">
      <ParticipantNav />
      <Switch>
        <Route exact path={`${path}`}>
          <Dashboard />
        </Route>
        <Route exact path={`${path}/my-schedule`}>
          <MySchedule />
        </Route>
        <Route exact path={`${path}/all-studies`}>
          <AllStudies />
        </Route>
        <Route exact path={`${path}/all-studies/:id`}>
          <CurrStudy />
        </Route>
        <Route path={`${path}/all-studies/:id/timeslots`}>
          <Timeslots />
        </Route>
      </Switch>
      
    </div>
  );
};

export default ParticipantRoutes