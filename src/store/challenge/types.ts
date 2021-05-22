import { ActionType } from "../actionTypes";

export const PHASES = {
  'NOT_STARTED': 'NOT_STARTED',
  'Not_Done_Today': 'Not_Done_Today',
  'Completed_Today': 'Completed_Today',
  'Compled': 'Compled'
}

export type ChallengeDay = {completed: boolean, progress: number}

export const ChallengeDayTemplate: ChallengeDay = { completed: false, progress: 0}

export type ChallengeStat = {
  level: string,
  phase: string,
  daysCompleted: number,
  settings: {goal?: number, notifications: {[notificationID: number]: {time: string, active: boolean}}},
  stats: {[date: string]: ChallengeDay}
}

const getGoalForID = (id: number): number => {
  switch (id) {
    case 0:
      return 4
  
    default:
      return 1;
  }
}

export const ChallengeStatTemplate = (challengeID: number): ChallengeStat => {
  return(
    {
      level: 'Bronze',
      daysCompleted: 0,
      phase: PHASES.NOT_STARTED,
      settings: {notifications: notificationsTemplate(challengeID), goal: getGoalForID(challengeID)},
      stats: {}
    }
  )
}

export type ChallengeStats = {[challengeID: number]: ChallengeStat}

export type ChallengeNotif = {time: string, active: boolean};

export type ChallengeNotifications = {[id: number]: ChallengeNotif};

const fullDayNotifs: ChallengeNotifications = {
  0: {time: '8:00 am', active: false},
  1: {time: '9:00 am', active: true},
  2: {time: '10:00 am', active: false},
  3: {time: '11:00 am', active: true},
  4: {time: '12:00 pm', active: false},
  5: {time: '1:00 pm', active: true},
  6: {time: '2:00 pm', active: false},
  7: {time: '3:00 pm', active: true},
  8: {time: '4:00 pm', active: false},
  9: {time: '5:00 pm', active: true},
  10: {time: '6:00 pm', active: false},
  11: {time: '7:00 pm', active: true},
  12: {time: '8:00 pm', active: false},
}

export const notificationsTemplate = (challengeID: number): ChallengeNotifications => {
  let notifs = {} as ChallengeNotifications;
  switch(challengeID){
    case(0):
    notifs = fullDayNotifs
  }

  return notifs;
}

export type Challenge = {
  name: string,
  id: number,
  goal: number,
  adjustableGoal: boolean
  label?: string
}

export type Challenges = {
  challenges: Challenge[],
  challengeStats: ChallengeStats,
}

export const ChallengeTemplate: Challenge = {
  name: 'drink water', id: 0, goal: 8, adjustableGoal: true 
}

export const ChallengesTeemplate: Challenges = {
  challenges: [
    { name: 'Drink Water', id: 0, goal: 8, adjustableGoal: true, label: 'cups' },
    { name: 'Wake Up Early', id: 1, goal: 1, adjustableGoal: false},
    { name: 'No Sugar', id: 2, goal: 1, adjustableGoal: false},
    { name: 'Cleaning', id: 3, goal: 1, adjustableGoal: false },
    { name: 'Reading Challenge', id: 4, goal: 1, adjustableGoal: false},
    { name: 'Writing Challenge', id: 5, goal: 1, adjustableGoal: false},
],
  challengeStats: {},
};

export type ChallengeAction = 
  { type: ActionType.SHOW_INTER_AD} | 
  { type: ActionType.UPDATE_CHALLENGE, challengeID: number, settings: ChallengeStat} | 
  { type: ActionType.GET_CHALLENGE, challengeID: number, settings: ChallengeStat}