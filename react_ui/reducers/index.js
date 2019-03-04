import { combineReducers } from 'redux';
import protocol from './protocol';
import subject from './subject';
import pds from './pds';
import record from './record';
import notification from './notification';
import pedigree from './pedigree';

const rootReducer = combineReducers({
  protocol,
  subject,
  pds,
  record,
  notification,
  pedigree,
});

export default rootReducer;
