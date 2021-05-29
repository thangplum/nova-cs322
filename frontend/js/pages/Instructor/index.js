import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import InstructorNav from '../../components/Navbar/InstructorNav';

const InstructorRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <div id="instructor-routes-page" className="main-container">
      <InstructorNav />
    </div>
  );
}

export default InstructorRoutes;