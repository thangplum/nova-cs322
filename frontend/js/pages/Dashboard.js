import React from 'react';
import { ListGroup } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    return (
    <div id="dashboard-page" className="main-container">
      <h1>Who are you?</h1>
      <div>
        <ListGroup>
            <ListGroup.Item action>
                <Link className="link" to='/dashboard/student'>Student</Link>
            </ListGroup.Item>
            <ListGroup.Item action>
                <Link className="link" to='/dashboard/researcher'>Researcher</Link>
            </ListGroup.Item>
            <ListGroup.Item action>
                <Link className="link" to='/dashboard/instructor'>Instructor</Link>
            </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default Dashboard;