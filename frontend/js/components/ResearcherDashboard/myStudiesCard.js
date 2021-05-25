import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCalendarTimes, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useRouteMatch } from 'react-router-dom';

const myStudiesCard = () => {
  const { path } = useRouteMatch();
  //console.log(route);
  return (
    <Card className="db-card">
      <Card.Header id="card-header">My studies</Card.Header>
      <ListGroup variant="flush">
        <Link to={`${path}/my-researches`} style={{ textDecoration: 'none' }}>
          <ListGroup.Item>
            <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faEdit} />
            View and edit your studies
          </ListGroup.Item>
        </Link>
        
        <ListGroup.Item>
        <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faCalendarCheck} />
          View, add or edit timeslots
        </ListGroup.Item>
        <ListGroup.Item>
          <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faCalendarTimes} />
          View uncredited timeslots
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default myStudiesCard;