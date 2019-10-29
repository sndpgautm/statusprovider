import { combineReducers } from 'redux';
import datadogReducer from './datadogReducer';
import azureReducer from './azureReducer';

export default combineReducers({
  azure: azureReducer,
  datadog: datadogReducer
});
