import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import {
  UpcomingAppointCard
} from "../../components/ResearcherDashboard";
import SignUp from "../../components/ParticipantDashboard/signUp";
import MySchedules from "../../components/ParticipantDashboard/mySchedules";
import axios from 'axios';
import getCookieToken from "../../utils/getCookieToken";

const ParticipantDashboard = () => {
  
  


  return (
    <div id="participant-page">
      <Row lg={2}>
        <Col>
          <SignUp />
          <MySchedules />
        </Col>
        <Col>
          <UpcomingAppointCard />
        </Col>
      </Row>
    </div>
  );
};

export default ParticipantDashboard;