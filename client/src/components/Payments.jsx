import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Payments extends Component {
  static propTypes = {
    handleToken: PropTypes.func,
  };
  render() {
    return (
      <StripeCheckout
        name="SendMaily"
        description="$5 for 50 surveys credits"
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
