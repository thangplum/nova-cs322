import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import getCookieToken from '../../utils/getCookieToken';
import { DateTime } from 'luxon';


const ResearchEditModal = ({ id, show, handleClose, setSaveChanges }) => {
  const [currRes, setCurrRes] = useState({});
  const [failShow, setFailShow] = useState(false);


  var csrftoken = getCookieToken('csrftoken');

  useEffect(() => {
    const fetchResearch = async () => {
      //var csrftoken = getCookieToken('csrftoken');
      if (id !== '') {
        const res = await axios.get(`/api/form/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken
          }
        })
        setCurrRes(res.data);
      }
    }
    
    fetchResearch();
  }, [id])

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    const val = e.target.getAttribute("id");
    let newVal = currRes[name].filter(item => item !== val);
    setCurrRes({
      ...currRes,
      [name]: newVal
    });
  };

  function handleChange(evt) {
    let value = evt.target.value;
    
    if (value && evt.target.name === "activeStudy" && typeof value === "string") {
      if (value === "true") value = true;
      if (value === "false") value = false;
    }

    // Since ethinicity and race are lists
    if (evt.target.name === "race" || evt.target.name === "gender") {
      if (!currRes[evt.target.name].includes(value)) {
        setCurrRes({
          ...currRes,
          [evt.target.name]: [...currRes[evt.target.name], value]
        });
      }
     
    } else {
      setCurrRes({
        ...currRes,
        [evt.target.name]: value
      });
    }
  }

  const patchRes = async () => {
    const res = await axios.patch(`/api/form/${id}/`, currRes, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    })
    if (res.status === 200) {
      setSaveChanges(true);
      handleClose();
    } else {
      setFailShow(true);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if research name is empty
    if (currRes.studyName == "") {
      alert("You need a name for your research.");
      return ;
    } else if (currRes.studyName.length > 100) {
      alert("Your research name is too long, you need another name for your research.");
      return ;
    }

    // Check if the duration is empty or is not a number
    if (currRes.duration == "") {
      alert("You need to specify how long is your session with participants.");
      return ;
    } else if (!Number(currRes.duration)) {
      alert("Your duration needs to be a number.");
      return ;
    } else if (currRes.duration.length > 3) {
      alert("Your appointment is too long.");
      return ;
    }
    // Check if the credit is empty and cannot be divisible by 0.5
    if (currRes.creditsResearch == "") {
      alert("You need to specify how much credit can be earned for your research.");
      return ;
    } else if (!Number(currRes.creditsResearch)) {
      alert("Your credit needs to be a number.");
      return ;
    } else if (currRes.creditsResearch % 0.5 != 0) {
      alert("Your credit needs to be divisible by 0.5");
      return ;
    } else if (currRes.creditsResearch.length > 4) {
      alert("Your credit is too long.");
      return ;
    }
    // Check if researcher name is empty
    if (currRes.researcher == "") {
      alert("You need a researcher for your research.");
      return ;
    } else if (currRes.researcher.length > 100) {
      alert("Your researcher name is too long.");
      return ;
    }
    // Verify expire date
    const formattedDate = DateTime.fromISO(currRes.expireDate);
    const currDate = DateTime.now();
    
    if (formattedDate.invalid !== null) {
      alert("Your expire date needs to be a valid date.");
      return ;
    } else if (currDate.ts >= formattedDate.ts) {
      alert("Your expire date should not be in the past.");
      return ;
    }

    // Verify age
    if (currRes.minAge !== "" && (!Number(currRes.minAge) || Number(currRes.minAge) <= 0)) {
      alert("Your minimum age must be a valid number.");
      return ;
    } 
    if (currRes.maxAge !== "" && (!Number(currRes.maxAge) || Number(currRes.maxAge) <= 0)) {
      alert("Your maximum age must be a valid number.");
      return ;
    }
    
    patchRes();
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>Research Information</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="researchName">
              <Form.Label>Study name</Form.Label>
              <Form.Control name="studyName" type="text" value={currRes.studyName || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId='abstract'>
              <Form.Label>
                Brief Abstract
              </Form.Label>
              <Form.Control name="briefAbstract" type="text" value={currRes.briefAbstract || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>
                Detailed Description
              </Form.Label>
              <Form.Control name="briefAbstract" type="text" value={currRes.detailedDescription || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId='duration'>
              <Form.Label>
                Duration
              </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control type="text" name="duration" value={currRes.duration || ''} onChange={handleChange} />
                <InputGroup.Append>
                  <InputGroup.Text>minutes</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Credits *
              </Form.Label>
              <Form.Control type="text" value={currRes.creditsResearch || ''} onChange={handleChange} name="creditsResearch" />
              <Form.Text className="text-muted">(Must be divisible by 0.5)</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Researchers *
              </Form.Label>
              <Form.Control type="text" name="researcher" onChange={handleChange} value={currRes.researcher || ''} />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Instructor *
              </Form.Label>
              <Form.Control as="select" custom name="instructor" value={currRes.instructor || ''} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Approval Code *
              </Form.Label>
              <Form.Control type="text" name="approvalCode" value={currRes.approvalCode || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Approval Expiration Date *
              </Form.Label>
                <Form.Control type="text" name="expireDate" value={currRes.expireDate || ''} onChange={handleChange} />
              <Form.Text className="text-muted">(YYYY-MM-DD)</Form.Text>
            </Form.Group>
            <Form.Group as={Row} controlId="studyIsApproved">
              <Form.Label column sm={2}>
                Approved?
              </Form.Label>
              <Col sm={10} style={{ padding: '5px'}}>
                <Form.Text>The study is approved</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyIsActive">
              <Form.Label column sm={2}>
                Active Study? *
              </Form.Label>
              <Col sm={10}>
                <Form.Check 
                  type="radio"
                  label='Yes'
                  value={true}
                  name="activeStudy"
                  onChange={handleChange}
                  checked={currRes.activeStudy || true}
                />{" "}
                <Form.Check
                  type="radio"
                  label="No"
                  value={false}
                  name="activeStudy"
                  onChange={handleChange}
                  checked={!currRes.activeStudy || false}
                />{" "}
                <Form.Text>(Inactive studies are sometimes kept for historical purposes; a study must be active
                  and approved to show up on the list of available studies to participants)
                </Form.Text>
              </Col>
            </Form.Group>
          </Form>

          <h3>Prescreen Information</h3>
          <Form>
            <Form.Group>
              <Form.Label>
                Minimum Age
              </Form.Label>
              <Form.Control name="minAge" type="text" value={currRes.minAge === "" || typeof currRes.minAge === 'undefined' ? "" : currRes.minAge} onChange={handleChange} />
              <Form.Text className='text-muted'>(Leave blank if allow all)</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Maximum Age
              </Form.Label>
              <Form.Control name="maxAge" type="text" value={currRes.maxAge === "" || typeof currRes.maxAge === 'undefined' ? "" : currRes.maxAge} onChange={handleChange} />
              <Form.Text className='text-muted'>(Leave blank if allow all)</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Gender
              </Form.Label>
              <Form.Control name="gender" as="select" htmlSize={3} onChange={handleChange} multiple>
                <option value="Male" disabled={typeof currRes.gender !== 'undefined' && currRes.gender.includes("Male")}>
                  Male
                </option>
                <option value="Female" disabled={typeof currRes.gender !== 'undefined' && currRes.gender.includes("Female")}>
                  Female
                </option>
                <option value="Not specified" disabled={typeof currRes.gender !== 'undefined' && currRes.gender.includes("Not specified")}>
                  Not specified
                </option>
              </Form.Control>
              <div style={{ marginTop: "10px" }}>
                {typeof currRes.gender !== 'undefined' && currRes.gender.map((gender) => {
                  return ( 
                    <Button key={gender} style={{ marginRight: "5px" }}>
                      {gender}
                      <span className="close-btn" id={gender} name="gender" aria-hidden="true" onClick={handleRemoveItem}>&times;</span>
                    </Button>
                  );
                })}
              </div>
              <Form.Text className="text-muted">(Leave blank if allow all)</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label >
                Ethnicty
              </Form.Label>
              <Form.Check>
                <Form.Check.Input type="radio" name="ethnicity" id="hispanic" onChange={handleChange} value={"Hispanic"} />
                <Form.Check.Label htmlFor="hispanic" name="ethnicity" onChange={handleChange} value={"Hispanic"}>Hispanic or Latino</Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input type="radio" name="ethnicity" id="not-hispanic" onChange={handleChange} value={"Not Hispanic or Latino"} />
                <Form.Check.Label htmlFor="not-hispanic" name="ethnicity" onChange={handleChange} value={"Not Hispanic or Latino"}>Not Hispanic or Latino</Form.Check.Label>
              </Form.Check>
              <Form.Text className="text-muted">(Leave blank if allow all)</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Race
              </Form.Label>
              <Form.Control name="race" as="select" onChange={handleChange} multiple>
                <option value="American Indian" disabled={typeof currRes.race !== 'undefined' && currRes.race.includes("American Indian")}>
                  American Indian or Alaska Native
                </option>
                <option value="Asian" disabled={typeof currRes.race !== 'undefined' && currRes.race.includes("Asian")}>
                  Asian
                </option>
                <option value="African American" disabled={typeof currRes.race !== 'undefined' && currRes.race.includes("African American")}>
                  Black or African American
                </option>
                <option value="Native Hawaiian" disabled={typeof currRes.race !== 'undefined' && currRes.race.includes("Native Hawaiian")}>
                  Native Hawaiian or Other Pacific Islander
                </option>
                <option value="White" disabled={typeof currRes.race !== 'undefined' && currRes.race.includes("White")}>
                  White
                </option>
              </Form.Control>
              <div style={{ marginTop: "10px" }}>
                {typeof currRes.race !== 'undefined' && currRes.race.map((race) => {
                  return ( 
                    <Button key={race} style={{ marginRight: "5px" }}>
                      {race}
                      <span className="close-btn" id={race} name="race" aria-hidden="true" onClick={handleRemoveItem}>&times;</span>
                    </Button>
                  );
                })}
              </div>
              <Form.Text className="text-muted">(Leave blank if allow all)</Form.Text>
            </Form.Group>
          </Form>
        </div>
        {failShow &&
          <Alert variant="danger" onClose={() => setFailShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              Cras mattis consectetur purus sit amet fermentum.
            </p>
          </Alert>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResearchEditModal;