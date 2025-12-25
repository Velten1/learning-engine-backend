// Repository de Histórico

import prisma from '../config/prisma'

//we need to get all data that service want, so it is sessions today, focused time today, reflection today. three queries to get this data.
//return object with today stats, like sessions today, focused time today, reflection today, or error if something goes wrong
export const todayPomodoroCompleted = async (userId: string) => {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
  
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)
  
    const sessionsToday = await prisma.pomodoro.count({
      where: {
        userId,
        status: 'COMPLETED',
        endedAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })
    return sessionsToday
  }

  //get sum of all podomoros completed today
  export const sumOfAllPomodorosCompletedToday = async (userId: string) => {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const startOfTomorrow = new Date()
    startOfTomorrow.setHours(23, 59, 59, 999)
    const sumOfAllPomodoroDurationToday = await prisma.pomodoro.aggregate({
      where: {
        userId,
        status: 'COMPLETED',
        endedAt: {
          gte: startOfToday,
          lt: startOfTomorrow
        }
      },
      _sum: {
        duration: true
      }
    })
    // Retorna o número (duration) ou 0 se for null
    return sumOfAllPomodoroDurationToday._sum.duration || 0
  }

  //get how many reflections created today
  export const countReflectionsCreatedToday = async (userId: string) => {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const startOfTomorrow = new Date()
    startOfTomorrow.setHours(23, 59, 59, 999)
    const countReflectionsCreatedToday = await prisma.reflection.count({
      where: {
        userId,
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow
        }
      }
    })
    return countReflectionsCreatedToday
  }

  //get total sessions crated in lifetime
  export const totalSessions = async (userId: string) => {
    const totalSessions = await prisma.pomodoro.count({
      where: {
        userId,
        status: 'COMPLETED',
      }
    })
    return totalSessions
  }

 //get total time elapsed in lifetime
 export const totalTimeElapsed = async (userId: string) => {
  const totalTimeElapsed = await prisma.pomodoro.aggregate({
    where: {
      userId,
      status: 'COMPLETED',
    },
    _sum: {
      duration: true
    }
  })
  return totalTimeElapsed._sum.duration || 0
 }

 //count how many pomodoros are created this week
 export const thisWeekSessions = async (userId: string) => {
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  const endOfWeek = new Date()
  endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 7)
  const thisWeekPomodoros = await prisma.pomodoro.count({
    where: {
      userId,
      createdAt: {
        gte: startOfWeek,
        lte: endOfWeek
      }
    }
  })
  return thisWeekPomodoros
}

//count unique topics studied in lifetime
export const countTopicsStudied = async (userId: string) => {
  const countTopicsStudied = await prisma.reflection.groupBy({
    by: ['topic'],
    where: {
      userId,
    }
  })
  return countTopicsStudied
}