import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formField';
import * as actions from '../../actions';

const SurveyFormReview = ({ onEdit, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text valign-wrapper btn-flat"
        onClick={onEdit}
      >
        Edit <i className="material-icons right">edit</i>
      </button>
      <button
        className="purple btn-flat white-text valign-wrapper right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
