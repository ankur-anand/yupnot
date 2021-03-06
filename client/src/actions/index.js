import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
/* eslint-disable import/prefer-default-export */
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res,
  });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/billing/stripe', { stripe_token: token });
  dispatch({
    type: FETCH_USER,
    payload: res,
  });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', { surveys: values });
  history.push('/surveys');
  dispatch({
    type: FETCH_USER,
    payload: res,
  });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
