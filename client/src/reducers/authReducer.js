import { FETCH_USER } from '../actions/types';

// Records Whether or not user is logged in
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload.data || false;
    default:
      return state;
  }
}
