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

  
