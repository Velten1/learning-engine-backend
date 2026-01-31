//pause controller
import { Request, Response } from 'express'
import { startPauseService } from '../services/pauseService'

//create a pause session for end's pomodoro session
export const startPause = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const pause = await startPauseService(userId as string)
        return res.status(201).json(pause)
    } catch (error: any) {
        console.error("Erro ao criar pause:", error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}