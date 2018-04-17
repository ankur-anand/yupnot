import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

import Header from './Header.jsx';
import Landing from './Landing.jsx';
import DashBoard from './Dashhboard.jsx';
import SurveyNew from './surveys/SurveyNew.jsx';

class App extends Component {
  static propTypes = {
    fetchUser: PropTypes.func,
  };
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
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
  }
}

export default connect(null, actions)(App);
