import firebase from '../../config/FirebaseConfig';
import 'firebase/database';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications';
import { ThunkResult, ThunkDispatchType } from "../types";
import { ActionType } from "../actionTypes";
import { Habit, Habits } from "./types";
import { RootState } from "..";
import { updateStats } from '../stats/actions';
import { showInterAd } from '../flags/actions';


export const newHabit = (habit: Habit): ThunkResult<Promise<void>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    dispatch({type: ActionType.ADD_NEW_HABIT, habit: habit})
    saveHabits({...getState().habits}, getState().auth.uid)
    updateStats(getState().stats, getState().auth.uid)
}

export const updateHabit = (habit: Habit): ThunkResult<Promise<void>> =>
async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
  dispatch({type: ActionType.UPDATE_HABIT, habit: habit})
  saveHabits({...getState().habits}, getState().auth.uid)
}

export const saveHabits = (habits: Habits, uid: string): void => {
  firebase.database().ref(`habits/${uid}/`).set(habits)
}

export const getHabits = (): ThunkResult<Promise<void>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    firebase.database().ref(`habits/${getState().auth.uid}/`).once('value')
    .then((snapshot) => {
      if(snapshot.val()) {
        dispatch({ type: ActionType.GET_HABITS, habits: snapshot.val()})
        return Promise.resolve()
      }
    })
}

export const deleteNotifiactions = (habit: Habit, callback?: () => void) => {
  // habit.notificatiions.forEach((id) => {
  //   LocalNotifications.cancel(habit.id * 10 + id)
  // })
  for (let i = 0; i < 7; i++) {
    LocalNotifications.cancel(Number(habit.id) * 10 + i)
    .then(() => {
     if (i === 6 && callback) {
       callback();
     }
    })
  }
}

export const deleteHabit = (habit: Habit): ThunkResult<Promise<void>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    deleteNotifiactions(habit);
    dispatch({ type: ActionType.DELETE_HABIT, habit: habit});
    updateStats(getState().stats, getState().auth.uid);
    saveHabits(getState().habits, getState().auth.uid);
}

export const completeHabit = (habit: Habit): ThunkResult<Promise<void>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    dispatch({ type: ActionType.COMPLETE_HABIT, habit: habit})
    saveHabits(getState().habits, getState().auth.uid)
    updateStats(getState().stats, getState().auth.uid)
}

export const unCompleteHabit = (habit: Habit): ThunkResult<Promise<void>> =>
  async (dispatch: ThunkDispatchType, getState: () => RootState): Promise<void> => {
    dispatch({ type: ActionType.UNCOMPLETE_HABIT, habit: habit})
    saveHabits(getState().habits, getState().auth.uid)
    updateStats(getState().stats, getState().auth.uid)
}

