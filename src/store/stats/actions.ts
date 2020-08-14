import { ThunkResult, ThunkDispatchType } from "../types";
import firebase from '../../config/FirebaseConfig';
import 'firebase/database';
import { ActionType } from "../actionTypes";
import { RootState } from "..";
import { Stats, StatsTemplate } from "./types";
import { Habits } from "../habits/types";

const calculateHabitCount = (habits: Habits): number => {
  let count = 0;

  Object.keys(habits).forEach((key) => !habits[key].deleted && count++)
  return count
}

export const getStats = (): ThunkResult<Promise<boolean>> =>
  async ( dispatch: ThunkDispatchType, getState: () => RootState): Promise<boolean> => {
    let todayStats = {habitCount: 0, habitsCompleted: 0}
    const date = new Date()
    const today = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
    return firebase.database().ref(`/stats/${getState().auth.uid}/`).once('value')
    .then((stats) => {
      if (!stats.val() || !stats.val()[today]) {
        //stats for today does not exist create one
        const newStats = {...StatsTemplate}
        newStats.stats = stats.val() ? {...stats.val()} : {}
        todayStats = {habitCount: calculateHabitCount(getState().habits), habitsCompleted: 0}
        newStats.stats[today] = todayStats
        newStats.today = todayStats
        firebase.database().ref(`/stats/${getState().auth.uid}/${today}`)
          .set({habitCount: Object.keys(getState().habits).length, habitsCompleted: 0})
          dispatch({ type: ActionType.GET_STATS, stats: newStats.stats})
        } else {
          todayStats = stats.val()[today]
          dispatch({ type: ActionType.GET_STATS, stats: stats.val()})
        }
        dispatch({ type: ActionType.UPDATE_TODAY, today: todayStats})
        return Promise.resolve(stats.val() ? false : true)
    })
    .catch(() => Promise.reject(false))
}

export const updateStats = (stats: Stats, uid: string): void => {
  console.log('update stats', stats)
  const date = new Date()
  const today = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
  firebase.database().ref(`/stats/${uid}/${today}`).set(stats.stats[today])
}

