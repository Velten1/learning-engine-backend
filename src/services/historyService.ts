// Service de Histórico

import { todayPomodoroCompleted } from '../repository/historyRepository'

//receive userId and call the repository to get today stats
//return object with today stats, like sessions today, focused time today, reflection today, or error if something goes wrong
export const getTodayStatsService = async (userId: string) => {
    //we dont need use try or catch
    //call the repository to get today stats
    const sessionsToday = await todayPomodoroCompleted(userId)
    if (!sessionsToday) {
        const error: any = new Error('Nenhuma sessão de Pomodoro completada hoje')
        error.statusCode = 404
        throw error
    }
    return sessionsToday
}