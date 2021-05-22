import { combineReducers } from 'redux';
import habits from './habits/reducer';
import flags from './flags/reducer';
import stats from './stats/reducer';
import auth from './auth/reducer';
import challenges from './challenge/reducer';

const rootReducer = combineReducers({
  habits,
  flags,
  stats,
  auth,
  challenges
});

export default rootReducer;