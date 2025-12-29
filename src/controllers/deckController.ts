import { Request, Response } from 'express'
import { createDeckService, getDecksByUserIdService} from '../services/deckService'

//extract userId from req
//extract body from req
//validate if body is filled, just name is required because description is optional
//call the service to create the deck
//return the deck created
export const createDeck = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const { name, description } = req.body
        if (!name) {
            return res.status(400).json({ message: 'Nome é obrigatório' })
        }
        const deck = await createDeckService(userId, name, description || null)
        return res.status(201).json(deck)
    } catch (error: any) {
        console.error('Erro ao criar deck:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from request
//call the service to get all decks by user id
//return 200 and array of decks
export const getDeckByUserId = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const decks = await getDecksByUserIdService(userId)
        return res.status(200).json(decks)
    } catch (error: any) {
        console.error('Erro ao obter decks:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}