import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Pagination } from 'react-bootstrap';
import getCookieToken from '../../utils/getCookieToken';
import axios from 'axios';

const MyResearches = () => {
  const [studies, setStudies] = useState([]);

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
        setStudies(res.data);
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
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>Index</th>
                  <th>Research Information</th>
                  <th style={{ width: '15%' }}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {studies.map((study) => {
                  return (
                    <tr key={study.id}>
                      <th>{study.id}</th>
                      <th><h4>{study.studyName}</h4></th>
                      <th>
                        <Button style={{ width: '100%' }}>Edit</Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
    </div>
  );
}

export default MyResearches;