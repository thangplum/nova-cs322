import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, Table, Button } from 'react-bootstrap';
import getCookieToken from "../../utils/getCookieToken";
import axios from "axios";

const CurrStudy = () => {
  const { id } = useParams();
  const [study, setStudy] = useState({});

  useEffect(() => {
    var csrftoken = getCookieToken('csrftoken');

    axios.get(`http://localhost:8000/api/form/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        console.log(response.data);
        const temp = response.data;
        setStudy(temp);
      }
    ).catch (
      error => console.log(error)
    )
  }, [])
  
  return (
    <div id="curr-study-page">
      {Object.keys(study).length === 0 && study.constructor === Object ? <></> :
      <Card className="db-card" id="curr-study">
        <Card.Header as="h5" style={{ fontWeight: "600" }}>Study Information</Card.Header>
        <Card.Body>
          <Table striped bordered>
            <tbody>
              <tr style={{ height: "80px"}}>
                <th style={{ width: "20%", verticalAlign: "middle" }}>Study Name</th>
                <td>
                  <div style={{ fontWeight: "600", fontSize: "2rem" }}>{study.studyName}</div>
                </td>
              </tr>
              <tr>
                <th style={{ width: "20%"}}>Credit</th>
                <td>{study.creditsResearch} credit(s)</td>
              </tr>
              <tr>
                <th style={{ width: "20%"}}>Duration</th>
                <td>{study.duration} minutes</td>
              </tr>
              <tr>
                <th style={{ width: "20%"}}>Researcher</th>
                <td>{study.reseacher}</td>
              </tr>
              <tr>
                <th>Instructor</th>
                <td>{study.instructor}</td>
              </tr>
            </tbody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="success">View timeslots for this study</Button>
          </div>
        </Card.Body>
      </Card>
      }
    </div>
  );
}

export default CurrStudy;