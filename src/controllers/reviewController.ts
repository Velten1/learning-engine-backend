// Controller de Reviews

import { Request, Response } from 'express'
import {
    reviewCardService,
    getCardsDueForReviewService
} from '../services/reviewService'

//extract userId from req
//extract cardId and rating from body
//validate if body is filled
//call the service to review the card
//return the card updated
export const reviewCard = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const { cardId, rating } = req.body

        if (!cardId || !rating) {
            return res.status(400).json({ message: 'Card ID e rating são obrigatórios' })
        }

        if (!['WRONG', 'GOOD', 'EASY'].includes(rating)) {
            return res.status(400).json({ message: 'Rating inválido. Deve ser WRONG, GOOD ou EASY' })
        }

        const card = await reviewCardService(userId, cardId, rating as 'WRONG' | 'GOOD' | 'EASY')
        return res.status(200).json(card)
    } catch (error: any) {
        console.error('Erro ao revisar card:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from token
//call the service to get cards due for review
//return the cards
export const getCardsDueForReview = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const cards = await getCardsDueForReviewService(userId)
        return res.status(200).json(cards)
    } catch (error: any) {
        console.error('Erro ao obter cards para revisão:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}


