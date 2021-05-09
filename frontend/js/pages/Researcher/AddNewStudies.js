import React, { useState } from 'react';
import { Card, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import getCookieToken from "../../utils/getCookieToken";
// Don't know why this library cannot be found when build so commenting this out for now 
// and will try to find a fix for this
import { DateTime } from 'luxon';
import axios from 'axios';

const AddNewStudies = () => {
  var csrftoken = getCookieToken('csrftoken');
  
  const [researchInfo, setResearchInfo] = useState({
    studyName: "",
    briefAbstract: "",
    detailedDescription: "",
    duration: "",
    creditsResearch: "",
    researcher: "", 
    instructor: "1",
    approvalCode: "",
    expireDate: "", //yyyy-mm-dd
    approved: true,
    activeStudy: true,
    minAge: "",
    maxAge: "",
    gender: [],
    race: [],
    ethnicity: ""
    // gender: Male: M, Feamale: F, Not Sprcified: NA
  })

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    const val = e.target.getAttribute("id");
    let newVal = researchInfo[name].filter(item => item !== val);
    setResearchInfo({
      ...researchInfo,
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
      if (!researchInfo[evt.target.name].includes(value)) {
        setResearchInfo({
          ...researchInfo,
          [evt.target.name]: [...researchInfo[evt.target.name], value]
        });
      }
     
    } else {
      setResearchInfo({
        ...researchInfo,
        [evt.target.name]: value
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   
    // Check if research name is empty
    if (researchInfo.studyName == "") {
      alert("You need a name for your research.");
      return ;
    } else if (researchInfo.studyName.length > 100) {
      alert("Your research name is too long, you need another name for your research.");
      return ;
    }

    // Check if the duration is empty or is not a number
    if (researchInfo.duration == "") {
      alert("You need to specify how long is your session with participants.");
      return ;
    } else if (!Number(researchInfo.duration)) {
      alert("Your duration needs to be a number.");
      return ;
    } else if (researchInfo.duration.length > 3) {
      alert("Your appointment is too long.");
      return ;
    }
    // Check if the credit is empty and cannot be divisible by 0.5
    if (researchInfo.creditsResearch == "") {
      alert("You need to specify how much credit can be earned for your research.");
      return ;
    } else if (!Number(researchInfo.creditsResearch)) {
      alert("Your credit needs to be a number.");
      return ;
    } else if (researchInfo.creditsResearch % 0.5 != 0) {
      alert("Your credit needs to be divisible by 0.5");
      return ;
    } else if (researchInfo.creditsResearch.length > 4) {
      alert("Your credit is too long.");
      return ;
    }
    // Check if researcher name is empty
    if (researchInfo.researcher == "") {
      alert("You need a researcher for your research.");
      return ;
    } else if (researchInfo.researcher.length > 100) {
      alert("Your researcher name is too long.");
      return ;
    }
    // Verify expire date
    const formattedDate = DateTime.fromISO(researchInfo.expireDate);
    const currDate = DateTime.now();
    
    if (formattedDate.invalid !== null) {
      alert("Your expire date needs to be a valid date.");
      return ;
    } else if (currDate.ts >= formattedDate.ts) {
      alert("Your expire date should not be in the past.");
      return ;
    }

    // Verify age
    if (researchInfo.minAge !== "" && (!Number(researchInfo.minAge) || Number(researchInfo.minAge) <= 0)) {
      alert("Your minimum age must be a valid number.");
      return ;
    } 
    if (researchInfo.maxAge !== "" && (!Number(researchInfo.maxAge) || Number(researchInfo.maxAge) <= 0)) {
      alert("Your maximum age must be a valid number.");
      return ;
    }

    // Post the value to the server
    // Need to change the url to this (https://prairie-sona.herokuapp.com/api/form/) before push to production
    axios.post('/api/form/', researchInfo, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }).then (
      response => {
        console.log(response.data);
        if(confirm("You have successfully created a new research")) {
          window.location.href = "/researcher";
        }
      }
    ).catch (
      error => console.log(error)
    )
  }

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
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="studyName">
              <Form.Label column sm={2}>
                Study name
              </Form.Label>
              <Col sm={10}>
                <Form.Control name="studyName" type="text" value={researchInfo.name} onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyAbstract">
              <Col sm={2}>
                <Form.Label>
                  Brief Abstract
                </Form.Label>
                <Form.Text>(Optional)</Form.Text>
              </Col>
              <Col sm={10}>
                <Form.Control name="briefAbstract" type="text" value={researchInfo.abstract} onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchDes">
              <Col sm={2}>
                <Form.Label>
                  Detailed Description
                </Form.Label>
                <Form.Text>(Optional)</Form.Text>
              </Col>
              
              <Col sm={10}>
                <Form.Control name="detailedDescription" value={researchInfo.desc} onChange={handleChange} type="text" as="textarea" rows={4} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchDuration">
              <Form.Label column sm={2}>
                Duration
              </Form.Label>
              <Col sm={10} md={3} >
                <InputGroup className="mb-2">
                  <Form.Control type="text" name="duration" value={researchInfo.duration} onChange={handleChange} />
                  <InputGroup.Append>
                    <InputGroup.Text>minutes</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchCredit">
              <Col sm={2}>
                <Form.Label>
                  Credits
                </Form.Label>
                <Form.Text>(Must be divisible by 0.5)</Form.Text>
              </Col>
              
              <Col sm={10}>
                <Form.Control type="text" value={researchInfo.creditsResearch} onChange={handleChange} name="creditsResearch" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="researchResearcher">
              <Form.Label column sm={2}>Researcher</Form.Label>
              <Col sm={10}>
                <Form.Control type="text" name="researcher" onChange={handleChange} value={researchInfo.reseacher} />
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
            <Form.Group as={Row} controlId="studyInstructor">
              <Form.Label column sm={2}>
                Instructor
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="select" custom name="instructor" value={researchInfo.instructor} onChange={handleChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyApprovalCode">
              <Form.Label column sm={2}>
                Approval Code
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" name="approvalCode" value={researchInfo.approvalCode} onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyExpireDate">
              <Col sm={2}>
                <Form.Label>
                  Approval Expiration Date
                </Form.Label>
                <Form.Text>(YYYY-MM-DD)</Form.Text>
              </Col>
              <Col sm={10}>
                <Form.Control type="text" name="expireDate" value={researchInfo.expireDate} onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyIsApproved">
              <Form.Label column sm={2}>
                Approved?
              </Form.Label>
              <Col sm={10}>
                <Form.Text>The study is approved</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="studyIsActive">
              <Form.Label column sm={2}>
                Active Study?
              </Form.Label>
              <Col sm={10}>
                <Form.Check 
                  type="radio"
                  label='Yes'
                  value={true}
                  name="activeStudy"
                  onChange={handleChange}
                  checked={researchInfo.activeStudy}
                />{" "}
                <Form.Check
                  type="radio"
                  label="No"
                  value={false}
                  name="activeStudy"
                  onChange={handleChange}
                  checked={!researchInfo.activeStudy}
                />{" "}
                <Form.Text>(Inactive studies are sometimes kept for historical purposes; a study must be active
                  and approved to show up on the list of available studies to participants)
                </Form.Text>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      {/* Prescreen form */}
      <Card className="db-card" id="basic-info-form">
        <Card.Header id="card-header" style={{ fontWeight: "700" }}>Basic Prescreen Information</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Minimum age select */}
            <Form.Group as={Row} controlId="minAge">
              <Col sm={2}>
                <Form.Label>
                  Minimum Age
                </Form.Label>
                <Form.Text>(Leave blank if allow all)</Form.Text>
              </Col>
              <Col sm={10}>
                <Form.Control name="minAge" type="text" value={researchInfo.minAge === "0" ? "" : researchInfo.minAge} onChange={handleChange} />
              </Col>
            </Form.Group>
            {/* Maximum age select */}
            <Form.Group as={Row} controlId="studyName">
              <Col sm={2}>
                <Form.Label>
                  Maximum Age
                </Form.Label>
                <Form.Text>(Leave blank if allow all)</Form.Text>
              </Col>
              <Col sm={10}>
                <Form.Control name="maxAge" type="text" value={researchInfo.maxAge === "0" ? "" : researchInfo.maxAge} onChange={handleChange} />
              </Col>
            </Form.Group>
            {/* Gender select */}
            <Form.Group as={Row} controlId="studyName">
              <Col sm={2}>
                <Form.Label>
                  Gender
                </Form.Label>
                <Form.Text>(Leave blank if allow all)</Form.Text>
              </Col>
              <Col sm={10}>
                <Form.Control name="gender" as="select" htmlSize={3} onChange={handleChange} multiple>
                  <option value="Male" disabled={researchInfo.gender.includes("Male")}>
                    Male
                  </option>
                  <option value="Female" disabled={researchInfo.gender.includes("Female")}>
                    Female
                  </option>
                  <option value="Not specified" disabled={researchInfo.gender.includes("Not specified")}>
                    Not specified
                  </option>
                </Form.Control>
                <div style={{ marginTop: "10px" }}>
                  {researchInfo.gender.map((gender) => {
                    return ( 
                      <Button key={gender} style={{ marginRight: "5px" }}>
                        {gender}
                        <span className="close-btn" id={gender} name="gender" aria-hidden="true" onClick={handleRemoveItem}>&times;</span>
                      </Button>
                    );
                  })}
                </div>
              </Col>
            </Form.Group>
            {/* Ethinicty select */}
            <Form.Group as={Row}>
              <Col sm={2}>
                <Form.Label >
                  Ethinicty
                </Form.Label>
                <Form.Text>(Leave blank if allow all)</Form.Text>
              </Col>
              <Col sm={10}>
                <Form.Check>
                  <Form.Check.Input type="radio" name="ethnicity" id="hispanic" onChange={handleChange} value={"Hispanic"} />
                  <Form.Check.Label htmlFor="hispanic" name="ethnicity" onChange={handleChange} value={"Hispanic"}>Hispanic or Latino</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                  <Form.Check.Input type="radio" name="ethnicity" id="not-hispanic" onChange={handleChange} value={"Not Hispanic or Latino"} />
                  <Form.Check.Label htmlFor="not-hispanic" name="ethnicity" onChange={handleChange} value={"Not Hispanic or Latino"}>Not Hispanic or Latino</Form.Check.Label>
                </Form.Check>
              </Col>
            </Form.Group>
            
            
            {/* race select */}
            <Form.Group as={Row} controlId="studyName">
              <Col sm={2}>
                <Form.Label>
                  Race
                </Form.Label>
                <Form.Text>(Leave blank if allow all)</Form.Text>
              </Col>
              <Col sm={10}>
                <Form.Control name="race" as="select" onChange={handleChange} multiple>
                  <option value="American Indian" disabled={researchInfo.race.includes("American Indian")}>
                    American Indian or Alaska Native
                  </option>
                  <option value="Asian" disabled={researchInfo.race.includes("Asian")}>
                    Asian
                  </option>
                  <option value="African American" disabled={researchInfo.race.includes("African American")}>
                    Black or African American
                  </option>
                  <option value="Native Hawaiian" disabled={researchInfo.race.includes("Native Hawaiian")}>
                    Native Hawaiian or Other Pacific Islander
                  </option>
                  <option value="White" disabled={researchInfo.race.includes("White")}>
                    White
                  </option>
                </Form.Control>
                <div style={{ marginTop: "10px" }}>
                  {researchInfo.race.map((race) => {
                    return ( 
                      <Button key={race} style={{ marginRight: "5px" }}>
                        {race}
                        <span className="close-btn" id={race} name="race" aria-hidden="true" onClick={handleRemoveItem}>&times;</span>
                      </Button>
                    );
                  })}
                </div>
              </Col>
            </Form.Group>

            {/* Submit button */}
            <Form.Group as={Row} controlId="researchSubmit">
              <Col md={{ span: 10, offset: 2 }}>
                <Button type="submit" variant="success" size="lg">
                  Add this study
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};


export default AddNewStudies;