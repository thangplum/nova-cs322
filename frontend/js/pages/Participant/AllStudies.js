import React, { useEffect, useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import getCookieToken from "../../utils/getCookieToken";
import { useHistory, useLocation } from "react-router-dom";

const AllStudies = () => {
  const [allStudies, setAllStudies] = useState([]);
  let history = useHistory();
  let location= useLocation();

  useEffect(() => {
    var csrftoken = getCookieToken('csrftoken');

    axios.get('/api/form/', {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        setAllStudies(...allStudies, response.data.results)
      }
    ).catch (
      error => console.log(error)
    )
  }, [])

  function handleClick(id) {
    history.push(`${location.pathname}/${id}`);
  }

  return (
    <div id="all-studies-page">
      <Card className="db-card" id="info">
        <Card.Header as="h3">
          <div style={{ fontWeight: "700" }}>All available studies</div>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Available?</th>
                <th>Study Information</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {allStudies.map((study) => {
                return (
                  <tr key={study.id}>
                    <td style={{ verticalAlign: "middle" }}>
                      {study.activeStudy && 
                      <div className="available-button">
                        <Button onClick={() => handleClick(study.id)}>Timeslots available</Button>
                      </div>
                      }
                    </td>
                    <td>
                      <div style={{ fontWeight: "600", fontSize: "1.5rem"}}>{study.studyName}</div>
                      <div>{study.reseacher}</div>
                      <div>{study.creditsResearch} credit(s)</div>
                    </td>
                    <td>
                      <div>
                        Age: {study.minAge !== "" && study.maxAge !== "" ? `Between age ${study.minAge} and ${study.maxAge}` :
                              study.minAge !== "" && study.maxAge ? `Older than ${study.minAge}` :
                              study.minAge === "" && study.maxAge ? `Younger than ${study.maxAge}` :
                              "All"}
                      </div>
                      <div>
                        Race: {study.race.length > 0 ? study.race.join() : "All"}
                      </div>
                      <div>
                        Ethnicity: {study.ethinicty.length > 0 ? study.ethinicty.join() : "All"}
                      </div>
                    </td>
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

export default AllStudies;