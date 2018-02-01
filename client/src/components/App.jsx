import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header.jsx';

const DashBoard = () => <h2> DashBoard </h2>;
const SurveyNew = () => <h2> SurveyNew </h2>;
const Landing = () => <h2> landing </h2>;

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" exact component={Landing} />
        <Route path="/surveys" exact component={DashBoard} />
        <Route path="/surveys/new" exact component={SurveyNew} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
