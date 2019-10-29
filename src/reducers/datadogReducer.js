import { GET_DATADOG_STATUS } from '../actions/types';

const initialState = {
  datadogIncidents: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATADOG_STATUS:
      return { ...state, datadogIncidents: action.payload };
    default:
      return state;
  }
}
