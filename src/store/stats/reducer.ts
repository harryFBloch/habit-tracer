import { ActionType } from "../actionTypes";
import { Stats } from "./types";
import { RootAction } from "..";

const initialState: Stats = {
  stats: {},
  today: {habitCount: 0, habitsCompleted: 0}
};

export default function stats(state=initialState, action: RootAction): typeof initialState  {

  const date = new Date()
  const today = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
  let newStats = initialState

  switch (action.type) {

    case(ActionType.GET_STATS):
      return {...state, stats: {...action.stats}}

    case(ActionType.UPDATE_TODAY):
      return {...state, today: action.today}

    case (ActionType.ADD_NEW_HABIT):
      newStats = {...state};
      newStats.stats[today].habitCount = newStats.stats[today].habitCount + 1
      return {...newStats, today: {...state.today, habitCount: state.today.habitCount + 1}};

    case (ActionType.DELETE_HABIT):
      newStats = {...state};
      newStats.stats[today].habitCount = newStats.stats[today].habitCount - 1
      return {...newStats, today: {...state.today, habitCount: state.today.habitCount - 1}};

    case(ActionType.COMPLETE_HABIT):
      newStats = {...state}
      newStats.stats[today].habitsCompleted = newStats.stats[today].habitsCompleted + 1
      return {...newStats, today: {...state.today, habitsCompleted: state.today.habitsCompleted + 1}}
    
    case (ActionType.UNCOMPLETE_HABIT):
      newStats = {...state}
      newStats.stats[today].habitsCompleted = newStats.stats[today].habitsCompleted - 1
      return {...newStats, today: {...state.today, habitsCompleted: state.today.habitsCompleted - 1}}
  
    default:
      return state;
  }
}