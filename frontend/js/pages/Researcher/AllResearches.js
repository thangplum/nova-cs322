import React from 'react';
import { Card, Table, Button, Pagination } from 'react-bootstrap';

const AllResearches = () => {
  return (
    <div id="all-studies-page">
       <Card className="db-card" id="info">
          <Card.Header as="h3">
            <div style={{ fontWeight: "700" }}>All researches</div>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              
            </Table>
          </Card.Body>
        </Card>
    </div>
  );
}

export default AllResearches;