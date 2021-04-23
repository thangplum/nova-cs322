import React from 'react';
import { ListGroup } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import NavBar from '../components/Navbar';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    return (
    <div id="dashboard-page" className="main-container">
      <NavBar />
      <h1>Who are you?</h1>
      <div>
        <ListGroup>
            <ListGroup.Item action id="main-dashboard-item">
                <Link className="link" to='/participant'>Participant</Link>
            </ListGroup.Item>
            <ListGroup.Item action id="main-dashboard-item">
                <Link className="link" to='/researcher'>Researcher</Link>
            </ListGroup.Item>
            <ListGroup.Item action id="main-dashboard-item">
                <Link className="link" to='/instructor'>Instructor</Link>
            </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default Dashboard;