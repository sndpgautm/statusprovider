import { GET_AZURE_STATUS } from '../actions/types';

const initialState = {
  azureStatus: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AZURE_STATUS:
      return { ...state, azureStatus: action.payload };
    default:
      return state;
  }
}
