// Controller de Pomodoro
import { Request, Response } from "express"
import { startPomodoroService, abandonmentPomodoroService, getCurrentPomodoroService, completePomodoroService } from "../services/pomodoroService"

//begin of pomodoro session
//controller dont need prisma cliente, it will be used in the repository
//repository will be used in the service

export const startPomodoro = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const pomodoro = await startPomodoroService(userId as string)
        return res.status(201).json(pomodoro)
    } catch (error: any) {
        console.error('Erro ao iniciar pomodoro:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}


//extract pomodoro session of userID and send to service to abandon it
//controller dont need prisma cliente, it will be used in the repository
//repository will be used in the service

export const abandonmentPomodoro = async (req: Request, res: Response) => {
    try {
        const { abandonmentReason } = req.body
        if (!abandonmentReason) {
            return res.status(400).json({ message: 'Motivo de abandonamento é obrigatório' })
        }
        const userId = (req as any).userId as string
        const pomodoro = await abandonmentPomodoroService(userId as string, abandonmentReason as string)
        return res.status(200).json(pomodoro)
    } catch (error: any) {
        console.error('Erro ao abandonar o pomodoro:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//return current pomodoro session of userID
//controller dont need prisma cliente, it will be used in the repository
//repository will be used in the service

export const getCurrentPomodoro = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const pomodoro = await getCurrentPomodoroService(userId as string)
        return res.status(200).json(pomodoro)
    } catch (error: any) {
        console.error('Erro ao obter o pomodoro atual:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//pickup userID and send to service to complete pomodoro session
//controller dont need prisma cliente, it will be used in the repository
//repository will be used in the service

export const completePomodoro = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const pomodoro = await completePomodoroService(userId as string)
        return res.status(200).json(pomodoro)
    } catch (error: any) {
        console.error('Erro ao completar o pomodoro:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}