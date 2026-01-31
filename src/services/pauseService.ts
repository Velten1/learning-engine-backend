import { createPause, findPauseByPomodoroId } from "../repository/pauseRepository"
import { findMostRecentCompletedPomodoroByUserId } from "../repository/pomodoroRepository"

//create a pause session for end's pomodoro session
//verify if already exists pause session for the pomodoro session
//if exists, return error because cant exists two pause sessions for the same pomodoro session
//if not exists, create a new pause session, it will return with pomodoroId, startedAt (now), status active and rest null
export const startPauseService = async (userId: string) => {
    // fetch most recent completed pomodoro for the user
    const completedPomodoro = await findMostRecentCompletedPomodoroByUserId(userId)
    
    if (!completedPomodoro) {
        const error: any = new Error("Não há uma sessão de pomodoro terminada para descansar.")
        error.statusCode = 404
        throw error
    }
    
    const pomodoroId = completedPomodoro.id
    
    // verify if already exists pause session for the pomodoro session
    const existingPause = await findPauseByPomodoroId(pomodoroId)
    if (existingPause) {
        const error: any = new Error("Já existe uma sessão de pause para esta sessão de pomodoro.")
        error.statusCode = 409
        throw error
    }
    
    const newPause = await createPause(pomodoroId)
    return newPause
}