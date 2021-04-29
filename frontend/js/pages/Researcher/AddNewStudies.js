import React from 'react';
import { Card, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
// put the token in header under this field :X-CSRFToken 

const AddNewStudies = () => {
  var csrftoken = readCookie('csrftoken');
  console.log("CSRF Token:"+csrftoken)
  return (
    <div id="add-new-page">
      <Card className="db-card" id="info">
        <Card.Header id="card-header">Study Information</Card.Header>
        <Card.Body>
          <Card.Text>
            Please enter information below about the study. The study name may not be the same as any other studies, to avoid confusion.
            All fields are required unless otherwise marked. Only the administrator may apporve a new study so that it is visible to
            participants
          </Card.Text>
          <Card.Text>
            All studies must have a REB approval code and expiration date specified. No timeslots maybe posted after the expiration date.
            Only the administrator may change the expiration date.
          </Card.Text>
          <Card.Text>
            If you are creating a simple study, you only need to complete the Basic Study Information section. More advanced options, 
            including pre-requisites and email notification options are available in the other options of the form.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="db-card" id="basic-info-form">
        <Card.Header id="card-header" style={{ fontWeight: "700" }}>Basic Study Information</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} controlId="studyName">
              <Form.Label column sm={2}>
                Study name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyAbstract">
              <Form.Label column sm={2}>
                Brief Abstract
                (Optional)
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchDes">
              <Form.Label column sm={2}>
                Detailed Description
                (Optional)
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" as="textarea" rows={4} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchDuration">
              <Form.Label column sm={2}>
                Duration
              </Form.Label>
              <Col sm={10} md={3} >
                <InputGroup className="mb-2">
                  <Form.Control  />
                  <InputGroup.Append>
                    <InputGroup.Text>minutes</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchCredit">
              <Form.Label column sm={2}>
                Credits
                (Must be divisible by 0.5)
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchResearcher">
              <Form.Label column sm={2}>Researcher</Form.Label>
              <Col sm={10}>
                <Form.Control as="select" custom>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Col>
              {/* Add twotable research style like Sona later */}
              {/* <Col sm={2} style={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faExchangeAlt} />
              </Col>
              <Col sm={4}>
                <Form.Control as="select" custom htmlSize={3}>
                  
                </Form.Control>
              </Col> */}
            </Form.Group>
            <Form.Group as={Row} controlId="studyAbstract">
              <Form.Label column sm={2}>
                Instructor
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="select" custom>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyName">
              <Form.Label column sm={2}>
                Approval Code
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyName">
              <Form.Label column sm={2}>
                Approval Expiration Date
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text"disabled />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyName">
              <Form.Label column sm={2}>
                Approved?
              </Form.Label>
              <Col sm={10}>
                <Form.Text>Currently not approved -- Approval is required</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchIsActive">
              <Form.Label column sm={2}>
                Active Study?
              </Form.Label>
              <Col sm={10}>
                <Form.Check 
                  custom
                  type="radio"
                  label='Yes'
                />
                <Form.Check
                  custom
                  type="radio"
                  label="No"
                />
                <Form.Text>(Inactive studies are sometimes kept for historical purposes; a study must be active
                  and approved to show up on the list of available studies to participants)
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchSubmit">
              <Col md={{ span: 10, offset: 2 }}>
              <Button variant="success" size="lg">Add this study</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddNewStudies;