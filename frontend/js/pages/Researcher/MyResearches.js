import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Pagination } from 'react-bootstrap';
import getCookieToken from '../../utils/getCookieToken';
import axios from 'axios';
import ResearchEditModal from '../../components/ResearcherDashboard/researchEditModal';

const MyResearches = () => {
  const [studies, setStudies] = useState([]);
  const [show, setShow] = useState(false);
  const [currId, setCurrId] = useState('');
  const [saveChanges, setSaveChanges] = useState(false);
  const [count, setCount] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCurrId(id);
    setShow(true);
  };

  let items = [];

  for (let number = 1; number <= Math.ceil(count/10); number++) {
    items.push(
      <Pagination.Item key={number} active={number === currPage} onClick={() => handleNavigate(number)}>
        {number}
      </Pagination.Item>
    );
  }

  const handleNavigate = async (pageNumber) => {
    var csrftoken = getCookieToken('csrftoken');
    setCurrPage(pageNumber);
    let next = '/api/research/';
    
    try {
      const res = await axios.get(next, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': csrftoken
        }
      });
      console.log(res.data);
      setStudies(res.data);
      setCount(res.data.length);
      
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleNavigate(1);
  }, [])

  return (
    <div id="all-studies-page">
      <Card className="db-card" id="info">
        <Card.Header as="h3">
          <div style={{ fontWeight: "700" }}>Edit Timeslot</div>
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
                      <Button 
                        style={{ width: '100%' }}
                        onClick={() => handleShow(study.id)}
                      >
                        Edit
                      </Button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {
            count > 10 ?
            <Pagination style={{ float: "right" }}>
              <Pagination.First disabled={currPage === 1 ? true : false} onClick={() => handleNavigate(1)} />
              <Pagination.Prev disabled={currPage === 1 ? true : false} onClick={() => handleNavigate(currPage - 1)} />
              {items}
              <Pagination.Next disabled={currPage === Math.ceil(count/10) ? true : false} onClick={() => handleNavigate(currPage + 1)} />
              <Pagination.Last disabled={currPage === Math.ceil(count/10) ? true : false} onClick={() => handleNavigate(Math.ceil(count/10))} />
            </Pagination> : null
          }
        </Card.Body>
      </Card>
      <ResearchEditModal id={currId} show={show} handleClose={handleClose} setSaveChanges={setSaveChanges} />
    </div>
  );
}

export default MyResearches;