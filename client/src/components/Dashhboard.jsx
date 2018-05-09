import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList.jsx';

const Dashboard = () => (
  <div className="container">
    <SurveyList />
    <div className="fixed-action-btn">
      <Link to="/surveys/new" className="btn-floating btn-large purple">
        <i className="material-icons">add</i>
      </Link>
    </div>
  </div>
);

export default Dashboard;
