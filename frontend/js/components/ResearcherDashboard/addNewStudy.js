import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useRouteMatch } from "react-router-dom";

const addNewStudyCard = () => {
  let history = useHistory();
  const { path } = useRouteMatch();

  function handleClick() {
    history.push(`${path}/add-new`);
  }

  return (
    <Card className="db-card">
      <Card.Header id="card-header">Add New Study</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item action onClick={handleClick}>
          <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faPlus} />
          Create a new study
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default addNewStudyCard;