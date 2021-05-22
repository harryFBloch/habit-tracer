import { StateType } from 'typesafe-actions';
import rootReducer from './root-reducer';
import * as flagActions from './flags/actions';
import { FlagsAction } from './flags/types';
import * as habitActions from './habits/actions';
import { HabitAction } from './habits/types';
import * as statActions from './stats/actions';
import { StatsAction } from './stats/types';
import * as authActions from './auth/actions';
import { AuthAction } from './auth/types';
import * as challengeActions from './challenge/actions';
import { ChallengeAction } from './challenge/types';


export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const actions = {
  habits: habitActions,
  flags: flagActions,
  stats: statActions,
  auth: authActions,
  challenges: challengeActions
};

export * from './types';
export * from './habits/types';
export * from './flags/types';
export * from './stats/types';
export * from './auth/types';
export * from './challenge/types';

export type RootAction = HabitAction | FlagsAction | StatsAction | AuthAction | ChallengeAction; 
export type RootState = StateType<typeof rootReducer>;