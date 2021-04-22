import React from 'react';
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import MyStudiesCard from "../components/ResearcherDashboard/myStudiesCard";
import DashboardCard from "../components/ResearcherDashboard/dashboardCard";
// import AllStudiesCard from "../components/ResearcherDashboard/allStudiesCard";
// import AddNewStudyCard from "../components/ResearcherDashboard/addNewStudy";
// import PrescreenResultCard from "../components/ResearcherDashboard/prescreenResult";
// import UpcomingAppointCard from "../components/ResearcherDashboard/upcomingAppointments";
// import RecentActivitiesCard from "../components/ResearcherDashboard/recentActivities";
import {
  AllStudiesCard,
  AddNewStudyCard,
  PrescreenResultCard,
  UpcomingAppointCard,
  RecentActivitiesCard,
} from "../components/ResearcherDashboard";

const ResearcherDashboard = () => {

  return (
    <div id="researcher-page" className="r-main-container">
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