import { GET_DATADOG_STATUS } from './types';
import axios from 'axios';

export const getDatadogStatus = () => async dispatch => {
  const res = await axios.get(
    'https://1k6wzpspjf99.statuspage.io/api/v2/incidents.json'
  );

  dispatch({
    type: GET_DATADOG_STATUS,
    payload: res.data.incidents
  });
};
