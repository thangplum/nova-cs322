import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

const upcomingAppointmentsCard = () => {

  return (
     <Card className="db-card">
      <Card.Header id="card-header">Upcoming Appointments</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <div style={{ fontSize: "15px", fontWeight: "700" }}>Thoughts on Einstein's Twin Paradox: A new intepretation</div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "inline-block" }}>Wednesday, April 21, 2021 1:00 PM - 3:00 PM </div>
            <div style={{ display: "inline-block", float: "right"}}>
              <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faBuilding} />
              SMAC
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div style={{ fontSize: "15px", fontWeight: "700" }}>Thoughts on Einstein's Twin Paradox: A new intepretation</div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "inline-block" }}>Wednesday, April 21, 2021 1:00 PM - 3:00 PM </div>
            <div style={{ display: "inline-block", float: "right"}}>
              <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faBuilding} />
              SMAC
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div style={{ fontSize: "15px", fontWeight: "700" }}>Thoughts on Einstein's Twin Paradox: A new intepretation</div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "inline-block" }}>Wednesday, April 21, 2021 1:00 PM - 3:00 PM </div>
            <div style={{ display: "inline-block", float: "right"}}>
              <FontAwesomeIcon style={{ marginRight: '5px'}} icon={faBuilding} />
              SMAC
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default upcomingAppointmentsCard;