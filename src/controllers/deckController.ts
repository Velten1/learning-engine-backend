// Controller de Decks

import { Request, Response } from 'express'
import { 
    createDeckService, 
    getDeckByIdService,
    getDecksByUserIdService,
    updateDeckService,
    deleteDeckService
} from '../services/deckService'

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
//extract id from route params
//validate if id is provided
//call the service to get the deck
//return the deck
export const getDeckById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const deckId = req.params.id

        // validate if id is provided
        if (!deckId) {
            return res.status(400).json({ message: 'ID do baralho é obrigatório' })
        }

        const deck = await getDeckByIdService(deckId, userId)
        return res.status(200).json(deck)
    } catch (error: any) {
        console.error('Erro ao obter deck:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from token
//call the service to get the decks by user id
//return the decks
export const getDecksByUserId = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        // userId came from token dont need params in the route
        const decks = await getDecksByUserIdService(userId)
        return res.status(200).json(decks)
    } catch (error: any) {
        console.error('Erro ao obter decks:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from token
//extract id from route params
//extract from body the deck data
//verify if at least one field is provided for update
//if validations are ok, call the service to update the deck
//return the deck updated
export const updateDeck = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const deckId = req.params.id
        const deckData = req.body

        // verify if at least one field is provided for update
        if (Object.keys(deckData).length === 0) {
            return res.status(400).json({ message: 'Nenhum campo foi preenchido para ser atualizado' })
        }
        // call the service to update the deck
        const deck = await updateDeckService(deckId, userId, deckData)
        return res.status(200).json(deck)
    } catch (error: any) {
        console.error('Erro ao atualizar deck:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from token
//extract id from route params
//call the service to delete the deck
//return the deck deleted
export const deleteDeck = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const deckId = req.params.id
        const deck = await deleteDeckService(deckId, userId)
        return res.status(200).json(deck)
    } catch (error: any) {
        console.error('Erro ao deletar deck:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}