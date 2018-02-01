import axios from 'axios';
import { FETCH_USER } from './types';
/* eslint-disable import/prefer-default-export */
export const fetchUser = () =>
  function fetchCurrentUser(dispatch) {
    axios.get('/api/current_user').then(res =>
      dispatch({
        type: FETCH_USER,
        payload: res,
      }),
    );
  };
