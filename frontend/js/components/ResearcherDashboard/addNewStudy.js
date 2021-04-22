import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const addNewStudyCard = () => {

  return (
    <Card className="db-card">
      <Card.Header id="card-header">Add New Study</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faPlus} />
          Create a new study
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default addNewStudyCard;