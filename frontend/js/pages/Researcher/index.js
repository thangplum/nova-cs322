import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ResearchNav from "../../components/Navbar/ResearchNav";
import ProtectedRoutes from "../../components/ProtectedRoutes";
import ResearcherDashboard from './ResearcherDashboard';
import AddNewStudies from "./AddNewStudies";

const ResearchRoutes = () => {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <div id="research-routes-page" className="main-container">
      <ResearchNav />
      <Switch>
        <ProtectedRoutes exact path={`${path}/`}>
          <ResearcherDashboard />
        </ProtectedRoutes>
        <ProtectedRoutes path={`${path}/add-new`}>
          <AddNewStudies />
        </ProtectedRoutes>
      </Switch>
      
    </div>
  );
};

export default ResearchRoutes