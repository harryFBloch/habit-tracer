import { ActionType } from '../actionTypes';

export type Stat = {[date: string]: {habitCount: number, habitsCompleted: number}}

export interface Stats{
  stats: Stat,
  today: {habitCount: number, habitsCompleted: number},
}

export const StatsTemplate: Stats = {
  stats: {},
  today: {habitCount: 0, habitsCompleted: 0}
}

export type StatsAction = 
  { type: ActionType.UPDATE_STATS } | 
  { type: ActionType.GET_STATS, stats: Stat } | 
  { type: ActionType.UPDATE_TODAY, today: {habitsCompleted: number, habitCount: number}}
  