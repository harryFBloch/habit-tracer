import { Stat } from "../store";

export const getFinishedDates = (stats: Stat): {[key: string]: Date[]} => {
  const dates: Date[] = []
  Object.keys(stats).forEach((key) => {
    const stat = stats[key];
    if (stat.habitCount === stat.habitsCompleted){
      const dateParts = key.split('-')
      const newDate = new Date(Number(dateParts[2]), Number(dateParts[0]), Number(dateParts[1]));
      dates.push(newDate);
    }
  })
  return {finished: dates};
}

export const getAlmostFinishedDates = (stats: Stat): {[key: string]: Date[]} => {
  const dates: Date[] = []
  Object.keys(stats).forEach((key) => {
    const stat = stats[key];
    if (stat.habitCount > stat.habitsCompleted && stat.habitsCompleted > 0){
      const dateParts = key.split('-')
      const newDate = new Date(Number(dateParts[2]), Number(dateParts[0]), Number(dateParts[1]));
      dates.push(newDate);
    }
  })
  return {almostfinished: dates};
}