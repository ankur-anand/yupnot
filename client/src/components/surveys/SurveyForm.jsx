import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formField';
import SurveyField from './SurveyField.jsx';

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => (
      <Field
        component={SurveyField}
        type="text"
        label={label}
        name={name}
        key={name}
      />
    ));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red darken-4 btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="purple btn-flat right white-text">
            Next <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');

  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  // if (!values.title) {
  //   errors.title = 'You must provide a title';
  // }
  // if(!values.subject) {
  //   errors.subject = 'You must provide a subject'
  // }
  // if(!values.body) {
  //   errors.body = 'You must provide a email body'
  // }

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
