import React from 'react';
import { Row, Col } from "react-bootstrap";
import {
  MyStudiesCard,
  AllStudiesCard,
  AddNewStudyCard,
  PrescreenResultCard,
  UpcomingAppointCard,
  RecentActivitiesCard,
} from "../../components/ResearcherDashboard";

const ResearcherDashboard = () => {

  return (
    <div id="researcher-page">
      <Row lg={2}>
        <Col>
          <MyStudiesCard />
          <AllStudiesCard />
          <AddNewStudyCard />
          <PrescreenResultCard />
        </Col>
        <Col>
          <UpcomingAppointCard />
          <RecentActivitiesCard />
        </Col>
      </Row>
    </div>
  );
};

export default ResearcherDashboard;