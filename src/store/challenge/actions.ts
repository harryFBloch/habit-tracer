
import firebase from '../../config/FirebaseConfig';
import 'firebase/database';
import { ThunkDispatchType, ThunkResult } from '../types';
import { RootState } from '..';
import { ActionType } from '../actionTypes';
import { ChallengeStat, ChallengeStatTemplate, ChallengeDayTemplate, ChallengeDay } from '../challenge/types';
import { getDateString } from '../../utils/Dates';

export const getChallengeStat = (challengeID: number): ThunkResult<Promise<ChallengeStat>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<ChallengeStat> => {
    return firebase.database().ref(`/challenges/${getState().auth.uid}/${challengeID}`).once('value')
    .then((snapshot) => {
      dispatch({type: ActionType.GET_CHALLENGE, challengeID: challengeID, settings: snapshot.val()})
      if( snapshot.val()) {
        return Promise.resolve(snapshot.val());
      } else {
        return Promise.resolve(ChallengeStatTemplate(challengeID));
      }
    })
    .catch(() => {
      dispatch({type: ActionType.GET_CHALLENGE, challengeID: challengeID, settings: ChallengeStatTemplate(challengeID)})
      return Promise.resolve(ChallengeStatTemplate(challengeID));
    })
}

export const updateChallengeSettings = (challengeID: number, challengeStat: ChallengeStat): ThunkResult<Promise<void>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    dispatch({type: ActionType.UPDATE_CHALLENGE, challengeID: challengeID, settings: challengeStat})
    firebase.database().ref(`/challenges/${getState().auth.uid}/${challengeID}/settings`).set(challengeStat.settings)
}

export const getTodaysStatsForChallenge = (challengeID: number): ThunkResult<Promise<ChallengeDay>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<ChallengeDay> => {
    const dateString = getDateString(new Date());
    return firebase.database().ref(`/challenges/${getState().auth.uid}/${challengeID}/stats/${dateString}`).once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        dispatch({ type: ActionType.UPDATE_CHALLENGE_STAT, id: challengeID, dateString: dateString, stat: snapshot.val()})
        return Promise.resolve(snapshot.val());
      } else {
        dispatch({ type: ActionType.UPDATE_CHALLENGE_STAT, id: challengeID, dateString: dateString, stat: {ChallengeDayTemplate}})
        return Promise.resolve(ChallengeDayTemplate);
      }
    })
    .catch(() => {
      dispatch({ type: ActionType.UPDATE_CHALLENGE_STAT, id: challengeID, dateString: dateString, stat: {ChallengeDayTemplate}})
      return Promise.resolve(ChallengeDayTemplate);
    })
}

export const updateProgress = (challengeID: number, todayStat: ChallengeDay, newLevel: string, newDaysCompleted: number): ThunkResult<Promise<void>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    const dateString = getDateString(new Date());
    let challengeStats = getState().challenges.challengeStats[challengeID]
    if (challengeStats) {
      challengeStats.stats[dateString] = todayStat;
    } else {
      challengeStats = ChallengeStatTemplate(challengeID)
    }
    challengeStats.stats[dateString] = todayStat;
    challengeStats.level = newLevel;
    challengeStats.daysCompleted = newDaysCompleted;
    dispatch({type: ActionType.UPDATE_CHALLENGE_STAT, id: challengeID, dateString: dateString, stat: todayStat})
    firebase.database().ref(`/challenges/${getState().auth.uid}/${challengeID}`).set(challengeStats);
}



