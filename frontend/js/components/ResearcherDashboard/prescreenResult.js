import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const prescreenResultCard = () => {

  return (
    <Card className="db-card">
      <Card.Header id="card-header">Prescreen Results</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faUsers} />
          Analyze participant prescreen results
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default prescreenResultCard;