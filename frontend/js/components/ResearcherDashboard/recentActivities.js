import React from 'react';
import { Card, ListGroup, Badge } from "react-bootstrap";

const recentActivitiesCard = () => {

  return (
    <Card className="db-card">
      <Card.Header id="card-header">Studies with Recent Activity</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item style={{ width: "100%" }}>
          <div style={{ display: "inline-block" }}>Pronunciation of Words</div>
          <Badge pill variant="danger" style={{ display: "inline-block", float: "right" }}>
            April 20, 2021
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <div style={{ display: "inline-block" }}>Sunlight and Vitamin D</div>
          <Badge pill variant="danger" style={{ display: "inline-block", float: "right" }}>
            March 10, 2021
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <div style={{ display: "inline-block" }}>Lack of Sleep</div>
          <Badge pill variant="danger" style={{ display: "inline-block", float: "right" }}>
            April 24, 2021
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default recentActivitiesCard;