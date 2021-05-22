import { ActionType } from "../actionTypes";
import { Challenges, ChallengesTeemplate } from "./types";
import { RootAction } from "..";

const initialState: Challenges = ChallengesTeemplate;

export default function auth(state=initialState, action: RootAction): typeof initialState  {
  switch (action.type) {
    case (ActionType.GET_CHALLENGE):
      return {...state, [action.challengeID]: action.settings}
    default:
      return state;
  }
}