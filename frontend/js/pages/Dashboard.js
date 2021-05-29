import React, { useEffect, useState } from 'react';
import { ListGroup } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import NavBar from '../components/Navbar';
import axios from 'axios';
import getCookieToken from '../utils/getCookieToken';

const Dashboard = () => {
  const csrftoken = getCookieToken('csrftoken');
  const [isRes, setIsRes] = useState(false);
  const [isIns, setIsIns] = useState(false);

  useEffect(() => {
    axios.get('/api/profile/usertype/', {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    })
      .then(res => {
        setIsRes(res.data.is_researcher);
        setIsIns(res.data.is_instructor);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div id="dashboard-page" className="main-container">
      <NavBar />
      <h1>Who are you?</h1>
      <div>
        <ListGroup>
            <ListGroup.Item action id="main-dashboard-item">
                <Link className="link" to='/participant'>Participant</Link>
            </ListGroup.Item>
            {isRes ?
              <ListGroup.Item action id="main-dashboard-item">
                  <Link className="link" to='/researcher'>Researcher</Link>
              </ListGroup.Item> : 
              <ListGroup.Item disabled id="main-dashboard-item">
                  <Link className="link" to='/researcher'>Researcher</Link>
              </ListGroup.Item>
            }
            {isIns ?
              <ListGroup.Item action id="main-dashboard-item">
                <Link className="link" to='/instructor'>Instructor</Link>
              </ListGroup.Item> : 
              <ListGroup.Item disabled id="main-dashboard-item">
                <Link className="link" to='/instructor'>Instructor</Link>
              </ListGroup.Item>
            }
            
        </ListGroup>
      </div>
    </div>
  );
};

export default Dashboard;