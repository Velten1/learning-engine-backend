// Service de Histórico

import {
  sumOfAllPomodorosCompletedToday,
  todayPomodoroCompleted,
  countReflectionsCreatedToday,
  totalSessions,
  totalTimeElapsed,
  thisWeekSessions,
  countTopicsStudied

} from "../repository/historyRepository";

//receive userId and call the repository to get today stats
//return object with today stats, like sessions today, focused time today, reflection today
export const getTodayStatsService = async (userId: string) => {
  //call the repository to get today stats
  const sessionsToday = await todayPomodoroCompleted(userId);

  //call the repository to get sum of all pomodoros completed today
  const focusedTimeToday = await sumOfAllPomodorosCompletedToday(userId);

  //call the repository to count how many reflections created today
  const reflectionsToday = await countReflectionsCreatedToday(userId);

  // Retorna os valores (0 é um valor válido, não um erro)
  return {
    sessionsToday,
    focusedTimeToday,
    reflectionsToday,
  };
};

//receive userId and call the repository to get all stats
//return object with all stats, like total sessions, total time elapsed, this week sessions, how many topics studied

export const getAllStatsService = async (userId: string) => {
  //call the repository to get total sessions
  const totalSessionsCount = await totalSessions(userId);

  //call the repository to get total time elapsed
  const totalTimeElapsedMinutes = await totalTimeElapsed(userId);

  //call the repository to get this week sessions
  const thisWeekSessionsCount = await thisWeekSessions(userId);

  //call the repository to get how many topics studied
  const topicsStudiedArray = await countTopicsStudied(userId);
  const topicsStudiedCount = topicsStudiedArray.length;

  //return object with all stats
  return {
    totalSessions: totalSessionsCount,
    totalTimeElapsed: totalTimeElapsedMinutes,
    thisWeekSessions: thisWeekSessionsCount,
    topicsStudied: topicsStudiedCount,
  };
};
