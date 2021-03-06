import { ActionType } from "../actionTypes";
import { Habits } from "./types";
import { RootAction } from "..";

const initialState: Habits = {};

export default function auth(state=initialState, action: RootAction): typeof initialState  {
  switch (action.type) {
  
    case (ActionType.ADD_NEW_HABIT):
      return {...state,[action.habit.id]: action.habit};
    
    case (ActionType.GET_HABITS):
      return {...action.habits}

    case (ActionType.DELETE_HABIT):
      const newHabits = {...state}
      newHabits[action.habit.id].deleted = true
      return newHabits

    case (ActionType.UPDATE_HABIT):
      const habits = {...state};
      habits[action.habit.id] = action.habit;
      return habits;

    case (ActionType.COMPLETE_HABIT):
      const completeHabits = {...state}
      if (completeHabits[action.habit.id].datesCompleted) {
        completeHabits[action.habit.id].datesCompleted.push(Date.now())
      } else {
        completeHabits[action.habit.id].datesCompleted = [Date.now()]
      }
      return completeHabits;
    
    case (ActionType.UNCOMPLETE_HABIT):
      const unCompleteHabits = {...state};
      unCompleteHabits[action.habit.id].datesCompleted.pop() 
      return unCompleteHabits
        
      
    default:
      return state;
  }
}