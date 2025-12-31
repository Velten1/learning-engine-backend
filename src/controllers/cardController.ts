// Controller de Cards

import { Request, Response } from 'express'
import {
    createCardService,
    getCardByIdService,
    getCardsByDeckIdService,
    updateCardService,
    deleteCardService
} from '../services/cardService'

//extract userId from req
//extract deckId, front, back from body
//validate if body is filled
//call the service to create the card
//return the card created
export const createCard = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const { deckId, front, back } = req.body

        if (!deckId || !front || !back) {
            return res.status(400).json({ message: 'Deck ID, frente e verso são obrigatórios' })
        }

        const card = await createCardService(userId, deckId, front, back)
        return res.status(201).json(card)
    } catch (error: any) {
        console.error('Erro ao criar card:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from request
//extract id from route params
//validate if id is provided
//call the service to get the card
//return the card
export const getCardById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const cardId = req.params.id

        if (!cardId) {
            return res.status(400).json({ message: 'ID do card é obrigatório' })
        }

        const card = await getCardByIdService(cardId, userId)
        return res.status(200).json(card)
    } catch (error: any) {
        console.error('Erro ao obter card:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from token
//extract deckId from route params
//validate if deckId is provided
//call the service to get the cards by deck id
//return the cards
export const getCardsByDeckId = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const deckId = req.params.deckId

        if (!deckId) {
            return res.status(400).json({ message: 'ID do deck é obrigatório' })
        }

        const cards = await getCardsByDeckIdService(deckId, userId)
        return res.status(200).json(cards)
    } catch (error: any) {
        console.error('Erro ao obter cards:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from token
//extract id from route params
//extract from body the card data
//verify if at least one field is provided for update
//if validations are ok, call the service to update the card
//return the card updated
export const updateCard = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const cardId = req.params.id
        const cardData = req.body

        if (!cardId) {
            return res.status(400).json({ message: 'ID do card é obrigatório' })
        }

        //verify if at least one field is provided for update
        if (Object.keys(cardData).length === 0) {
            return res.status(400).json({ message: 'Nenhum campo foi preenchido para ser atualizado' })
        }

        const card = await updateCardService(cardId, userId, cardData)
        return res.status(200).json(card)
    } catch (error: any) {
        console.error('Erro ao atualizar card:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from token
//extract id from route params
//call the service to delete the card
//return the card deleted
export const deleteCard = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const cardId = req.params.id

        if (!cardId) {
            return res.status(400).json({ message: 'ID do card é obrigatório' })
        }

        const card = await deleteCardService(cardId, userId)
        return res.status(200).json(card)
    } catch (error: any) {
        console.error('Erro ao deletar card:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

