import React from 'react';
import { Card } from "react-bootstrap"

const Home = ({children}) => {

  return (
    <Card className="db-card">
      {children}
    </Card>
  );
};

export default Home;