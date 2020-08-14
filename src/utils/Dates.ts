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

// {/* {[key: string]: {data: {t: Date, y: number}[],  color: string}}; */}
export const getHabitsCompleteData = (stats: Stat): {t: Date, y: number}[] => {
  const dates = Object.keys(stats).map((key) => {
    const dateParts = key.split('-')
    return {date: new Date(Number(dateParts[2]), Number(dateParts[0]), Number(dateParts[1])), habitsCompleted: stats[key].habitsCompleted}
  })
  dates.sort(( a, b) => b.date.getTime() - a.date.getTime()) // Short form for: dates.sort(by: < )
  return dates.map((date) => {
    return {t: date.date, y: date.habitsCompleted}
  })
}