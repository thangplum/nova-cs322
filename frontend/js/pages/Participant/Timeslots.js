import React, { useState, useEffect } from 'react';
import { Card, Table,  Pagination } from 'react-bootstrap';
import TimeslotsRow from './TimeslotsRow';
import { useSelector } from 'react-redux';

const Timeslots = () => {
  const slots = useSelector(state => state.addAppointment.slots);
  const [count, setCount] = useState(slots.length);
  const [currPage, setCurrPage] = useState(1);
  const [currList, setCurrList] = useState(slots.slice(10));
 
  // Setup pagination
  let items = [];

  for (let number = 1; number <= Math.ceil(count/10); number++) {
    items.push(
      <Pagination.Item key={number} active={number === currPage} onClick={() => handleNavigate(number)}>
        {number}
      </Pagination.Item>
    );
  }

  const handleNavigate = (pageNumber) => {
    setCurrPage(pageNumber);
    setCurrList(slots.slice(10 * (pageNumber - 1), 10 * pageNumber));
  }

  useEffect(() => {
    handleNavigate(1);
  }, [])

  return (
    <>
      {
        slots && slots.length > 0 ?
        <Card className="db-card" id="info">
          <Card.Header as="h3">
            <div style={{ fontWeight: "700" }}>All available timeslots</div>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: '85%' }}>Timeslot Information</th>
                  <th>Reserve</th>
                </tr>
              </thead>
              <tbody>
                {
                  currList.map((slot, index) => {
                    if (typeof slot.start !== 'undefined') {
                      return (
                        <TimeslotsRow 
                          key={index}
                          startDate={slot.start.dateTime} 
                          endDate={slot.end.dateTime}
                          link={slot.htmlLink}
                        />
                      );
                    }
                    
                    return null;
                  })
                }
                
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
        </Card> : <h5>Loading...</h5>
      }
    </>
    
    
  );
}

export default Timeslots;