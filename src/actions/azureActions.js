import { GET_AZURE_STATUS } from './types';
import axios from 'axios';

let Parser = require('rss-parser');
let parser = new Parser();

export const getAzureStatus = () => async dispatch => {
  //Using CORS proxy to get around “No Access-Control-Allow-Origin header” problems as I cannot change the server side CORS policy
  const proxyurl =
    'https://cors-anywhere.herokuapp.com/' +
    'azure.microsoft.com/en-us/status/feed/';

  await axios.get(proxyurl).then(res => {
    //Parsing XML RSS feed to JSON format using npm rss-parser
    parser.parseString(res.data).then(feedInJson => {
      dispatch({
        type: GET_AZURE_STATUS,
        payload: feedInJson.items
      });
    });
  });
};
