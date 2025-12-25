// Controller de histórico
import { Request, Response } from 'express'
import { getTodayStatsService, getAllStatsService } from '../services/historyService'

//extract userId from token
//call the service to get today stats
//return the today stats
export const getTodayStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const todayStats = await getTodayStatsService(userId)
        return res.status(200).json(todayStats)
    } catch (error: any) {
        console.error('Erro ao obter as estatísticas do dia:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
} 

//extract userId from token
//call the service to get all stats 
//return all stats or error
export const getLifetimeStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const allStats = await getAllStatsService(userId)
        return res.status(200).json(allStats)
    } catch (error: any) {
        console.error('Erro ao obter as estatísticas gerais:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}
