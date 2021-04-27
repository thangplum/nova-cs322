import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit } from '@fortawesome/free-solid-svg-icons';

const mySchedules = () => {
  return (
    <Card className="db-card">
      <Card.Header id="card-header">My schedules & Credit</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faEdit} />
          View and edit your appointments
        </ListGroup.Item>
        <ListGroup.Item>
          <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faList} />
          View finished studies
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default mySchedules