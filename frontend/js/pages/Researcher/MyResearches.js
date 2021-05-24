import React, { useEffect } from 'react';
import { Card, Table, Button, Pagination } from 'react-bootstrap';
import getCookieToken from '../../utils/getCookieToken';
import axios from 'axios';

const MyResearches = () => {
  useEffect(() => {
    const fetchResearch = async () => {
      var csrftoken = getCookieToken('csrftoken');
      try {
        const res = await axios.get('/api/research/', {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken
          }
        })
        console.log(res);
      } catch(err) {
        console.log(err);
      }
      
    }
    
    fetchResearch();
  }, [])

  return (
    <div id="all-studies-page">
       <Card className="db-card" id="info">
          <Card.Header as="h3">
            <div style={{ fontWeight: "700" }}>My researches</div>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              
            </Table>
          </Card.Body>
        </Card>
    </div>
  );
}

export default MyResearches;