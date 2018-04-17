import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="container">
    <p>Dashboard</p>
    <div className="fixed-action-btn">
      <Link to="/surveys/new" className="btn-floating btn-large purple">
        <i className="material-icons">add</i>
      </Link>
    </div>
  </div>
);

export default Dashboard;
