import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import getCookieToken from "../../utils/getCookieToken";
import { useHistory, useLocation } from "react-router-dom";

const AllStudies = () => {
  const [allStudies, setAllStudies] = useState([]);
  const [count, setCount] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  let history = useHistory();
  let location= useLocation();

  // Setup pagination
  let items = [];

  for (let number = 1; number <= Math.ceil(count/10); number++) {
    items.push(
      <Pagination.Item key={number} active={number === currPage} onClick={() => handleNavigate(number)}>
        {number}
      </Pagination.Item>
    );
  }

  // "http://localhost:8000/api/form/?limit=10&offset=10"
  const handleNavigate = async (pageNumber) => {
    var csrftoken = getCookieToken('csrftoken');
    setCurrPage(pageNumber);
    let next = `http://localhost:8000/api/form/?limit=10&offset=${(pageNumber - 1) * 10}`;
    
    try {
      const res = await axios.get(next, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': csrftoken
        }
      });
      setAllStudies(res.data.results);
      setCount(res.data.count);
      
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleNavigate(1);
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
              {allStudies.length > 0 && allStudies.map((study) => {
                return (
                  <tr key={study.id}>
                    <td style={{ verticalAlign: "middle" }}>
                      {study.activeStudy ? 
                      <div className="available-button">
                        <Button onClick={() => handleClick(study.id)}>Timeslots available</Button>
                      </div> :
                      <div className="available-button">Timeslot is not available</div>
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
                        Gender: {study.gender === "" ? "All" :
                                 study.gender === "M" ? "Male" : 
                                 study.gender === "F" ? "Female" :
                                 "Not specified"}
                      </div>
                      <div>
                        Race: {study.race.length > 0 ? study.race.join(", ") : "All"}
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
          <Pagination style={{ float: "right" }}>
            <Pagination.First disabled={currPage === 1 ? true : false} onClick={() => handleNavigate(1)} />
            <Pagination.Prev disabled={currPage === 1 ? true : false} onClick={() => handleNavigate(currPage - 1)} />
            {items}
            <Pagination.Next disabled={currPage === Math.ceil(count/10) ? true : false} onClick={() => handleNavigate(currPage + 1)} />
            <Pagination.Last disabled={currPage === Math.ceil(count/10) ? true : false} onClick={() => handleNavigate(Math.ceil(count/10))} />
          </Pagination>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AllStudies;