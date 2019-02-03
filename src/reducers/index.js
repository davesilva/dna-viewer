import { combineReducers } from 'redux';
import sequenceList from './sequenceList';
import sequence from './sequence';

export default combineReducers({
  sequenceList,
  sequence
});
