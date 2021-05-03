import React from 'react';
import { Button, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useRouteMatch } from "react-router-dom";

const signUp = () => {
  let history = useHistory();
  const { path } = useRouteMatch();

  function handleClick() {
    history.push(`${path}/all-studies`);
  }

  return (
    <Card className="db-card">
      <Card.Header id="card-header">Study Sign-up</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Button style={{ width: "100%", fontWeight: "600"}} variant="success" onClick={handleClick}>
            View available studies
            <FontAwesomeIcon style={{ marginLeft: '5px'}} icon={faArrowCircleRight} />
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default signUp