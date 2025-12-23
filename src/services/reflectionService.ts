// Service de Reflexões

import { findReflectionByPomodoroId, createReflection, findReflectionById } from "../repository/reflectionRepository"
import { findPomodoroByIdAndUserId } from "../repository/pomodoroRepository"

//verify if pomodoroSessionId exists and it is from userId
//verify if exists a reflection for this pomodoroSessionId
//if validations are ok, call the repository to make all db things
//returns reflection created
export const createReflectionService = async (userId: string, reflectionData: {
    pomodoroId: string;
    topic: string;
    whatIThought: string;
    whatItActuallyIs: string;
    summary: string;
    mandatoryQuestion: string;
    optionalQuestion?: string | null;
}) => {
    // verify if pomodoro session exists and it is from userId
    const pomodoroSession = await findPomodoroByIdAndUserId(reflectionData.pomodoroId, userId) // here use the pomodoro repository to find the pomodoro session by id and userId
    if (!pomodoroSession) {
        const error: any = new Error("Sessão de Pomodoro não existe ou não pertence ao usuário")
        error.statusCode = 404
        throw error
    }
    
    // verify if exists a reflection for this pomodoroId
    const existingReflection = await findReflectionByPomodoroId(reflectionData.pomodoroId)
    if (existingReflection) {
        const error: any = new Error("Reflexão já existe para esta sessão de Pomodoro")
        error.statusCode = 409
        throw error
    }
    
    // create reflection with userId included
    const createdReflection = await createReflection({
        ...reflectionData,
        userId: userId,
    })
    return createdReflection
}

//verify if reflection exists
//verify if reflection is from userId
//if validations are ok, call the repository to get the reflection
//returns reflection
export const getReflectionService = async (userId: string, reflectionId: string) => {
    // verify if reflection exists
    const reflection = await findReflectionById(reflectionId)
    if (!reflection) {
        const error: any = new Error("Reflexão não existe")
        error.statusCode = 404
        throw error
    }
    // verify if reflection is from userId
    if (reflection.userId !== userId) {
        const error: any = new Error("Reflexão não pertence ao usuário")
        error.statusCode = 403
        throw error
    }
    // if validations are ok, call the repository to get the reflection
    return reflection
}