import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ResearchNav from "../../components/Navbar/ResearchNav";
import ResearcherDashboard from './ResearcherDashboard';
import AddNewStudies from "./AddNewStudies";

const ResearchRoutes = () => {
  const { path } = useRouteMatch();
  console.log(path)

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
      </Switch>
      
    </div>
  );
};

export default ResearchRoutes