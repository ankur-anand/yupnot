import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

import Header from './Header.jsx';
import Landing from './Landing.jsx';

const DashBoard = () => <h2> DashBoard </h2>;
const SurveyNew = () => <h2> SurveyNew </h2>;

class App extends Component {
  static propTypes = {
    fetchUser: PropTypes.func,
  };
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
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
