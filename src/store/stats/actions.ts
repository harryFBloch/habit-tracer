import { ThunkResult, ThunkDispatchType } from "../types";
import firebase from '../../config/FirebaseConfig';
import 'firebase/database';
import { UniqueDeviceID } from "@ionic-native/unique-device-id";
import { ActionType } from "../actionTypes";
import { RootState } from "..";
import { Stats, StatsTemplate } from "./types";

export const getStats = (): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    let todayStats = {habitCount: 0, habitsCompleted: 0}
    const date = new Date()
    const today = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
    firebase.database().ref(`/stats/${getState().auth.uid}/`).once('value')
    .then((stats) => {
      if (!stats.val() || !stats.val()[today]) {
        //stats for today does not exist create one
        const newStats = {...StatsTemplate}
        todayStats = {habitCount: getState().habits.length, habitsCompleted: 0}
        newStats.stats[today] = todayStats
        newStats.today = todayStats
        console.log('newStats', newStats)
        firebase.database().ref(`/stats/${getState().auth.uid}/${today}`)
          .set({habitCount: getState().habits.length, habitsCompleted: 0})
          dispatch({ type: ActionType.GET_STATS, stats: newStats.stats})
      } else {
        todayStats = stats.val()[today]
        dispatch({ type: ActionType.GET_STATS, stats: stats.val()})
      }
      dispatch({ type: ActionType.UPDATE_TODAY, today: todayStats})
    })
}

export const updateStats = (stats: Stats, uid: string): void => {
  console.log('update stats', stats)
  const date = new Date()
  const today = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
  firebase.database().ref(`/stats/${uid}/${today}`).set(stats.stats[today])
}

