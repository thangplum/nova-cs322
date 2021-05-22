import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useRouteMatch } from "react-router-dom";

const allStudiesCard = () => {
  let history = useHistory();
  const { path } = useRouteMatch();

  function handleClick() {
    history.push(`${path}/all-researches`);
  }

  return (
    <Card className="db-card">
      <Card.Header id="card-header">All Studies</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item action onClick={handleClick}>
          <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faListAlt} />
          View all studies available to participants
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default allStudiesCard;