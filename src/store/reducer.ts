import { combineReducers } from 'redux';

// import slices
import authReducer from './features/authSlice';
import dateReducer from './features/dateSlice';
import languageReducer from './features/languageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  date: dateReducer,
  language: languageReducer,
});

export default rootReducer;
