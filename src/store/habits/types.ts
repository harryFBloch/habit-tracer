import { ActionType } from '../actionTypes';

export interface Habit {
  notificatiions: number[];
  time: string;
  title: string;
  message: string;
  id: number;
  datesCompleted: number[];
  dateCreated: number;
  weekdays: number[];
}

export type Habits  = Habit[]


export enum WEEKDAYS {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saterday
}

export type HabitAction = 
  { type: ActionType.ADD_NEW_HABIT, habit: Habit } |
  { type: ActionType.GET_HABITS, habits: Habits } | 
  { type: ActionType.DELETE_HABIT, habit: Habit } |
  { type: ActionType.UPDATE_HABIT, habit: Habit } |
  { type: ActionType.COMPLETE_HABIT, habit: Habit } |
  { type: ActionType.UNCOMPLETE_HABIT, habit: Habit }
