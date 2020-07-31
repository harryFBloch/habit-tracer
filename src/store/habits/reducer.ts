import { ActionType } from "../actionTypes";
import { Habits } from "./types";
import { RootAction } from "..";
import { saveHabits } from "./actions";

const initialState: Habits = [];

export default function auth(state=initialState, action: RootAction): typeof initialState  {
  switch (action.type) {
  
    case (ActionType.ADD_NEW_HABIT):
      return [...state, action.habit];
    
    case (ActionType.GET_HABITS):
      return [...action.habits]

    case (ActionType.DELETE_HABIT):
      const newHabits = state.filter((habit) => habit.id !== action.habit.id)
      return newHabits

    case (ActionType.UPDATE_HABIT):
      const habits = [...state];
      habits[action.habit.id] = action.habit;
      return habits;

    case (ActionType.COMPLETE_HABIT):
      const completeHabits = [...state]
      if (completeHabits[action.habit.id].datesCompleted) {
        completeHabits[action.habit.id].datesCompleted.push(Date.now())
      } else {
        completeHabits[action.habit.id].datesCompleted = [Date.now()]
      }
      return completeHabits;
    
    case (ActionType.UNCOMPLETE_HABIT):
      const unCompleteHabits = [...state];
      unCompleteHabits[action.habit.id].datesCompleted.pop() 
      return unCompleteHabits
        
      
    default:
      return state;
  }
}