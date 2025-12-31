// Service de Cards

import {
    createCard,
    findCardById,
    findCardsByDeckId,
    findCardsDueForReview,
    updateCard,
    updateCardNextReview,
    deleteCard
} from "../repository/cardRepository"
import { findDeckById } from "../repository/deckRepository"

//validate that deck exists and belongs to userId
//validate that front and back are not empty
//create card with nextReviewAt = now()
export const createCardService = async (userId: string, deckId: string, front: string, back: string) => {
    //validate that deck exists and belongs to userId
    const deck = await findDeckById(deckId)
    if (!deck) {
        const error: any = new Error("Deck não encontrado")
        error.statusCode = 404
        throw error
    }
    if (deck.userId !== userId) {
        const error: any = new Error("Deck não pertence ao usuário")
        error.statusCode = 403
        throw error
    }

    //validate that front and back are not empty
    if (!front || front.trim().length === 0) {
        const error: any = new Error("Frente do card não pode estar vazia")
        error.statusCode = 400
        throw error
    }
    if (!back || back.trim().length === 0) {
        const error: any = new Error("Verso do card não pode estar vazio")
        error.statusCode = 400
        throw error
    }

    //create card with nextReviewAt = now()
    const card = await createCard(deckId, front.trim(), back.trim())
    return card
}

//validate that card exists
//validate that deck of card belongs to userId
//return card
export const getCardByIdService = async (cardId: string, userId: string) => {
    const card = await findCardById(cardId)
    if (!card) {
        const error: any = new Error("Card não encontrado")
        error.statusCode = 404
        throw error
    }
    //validate that deck of card belongs to userId
    if (card.deck.userId !== userId) {
        const error: any = new Error("Card não pertence ao usuário")
        error.statusCode = 403
        throw error
    }
    return card
}

//validate that deck exists and belongs to userId
//find all cards of deck
//return array of cards
export const getCardsByDeckIdService = async (deckId: string, userId: string) => {
    //validate that deck exists and belongs to userId
    const deck = await findDeckById(deckId)
    if (!deck) {
        const error: any = new Error("Deck não encontrado")
        error.statusCode = 404
        throw error
    }
    if (deck.userId !== userId) {
        const error: any = new Error("Deck não pertence ao usuário")
        error.statusCode = 403
        throw error
    }
    //find all cards of deck
    const cards = await findCardsByDeckId(deckId)
    return cards
}

//validate that card exists
//validate that deck of card belongs to userId
//validate front/back if provided
//update card
export const updateCardService = async (
    cardId: string,
    userId: string,
    cardData: {
        front?: string;
        back?: string;
    }
) => {
    //validate that card exists
    const card = await findCardById(cardId)
    if (!card) {
        const error: any = new Error("Card não encontrado")
        error.statusCode = 404
        throw error
    }
    //validate that deck of card belongs to userId
    if (card.deck.userId !== userId) {
        const error: any = new Error("Card não pertence ao usuário")
        error.statusCode = 403
        throw error
    }

    //validate front/back if provided
    if (cardData.front !== undefined && (!cardData.front || cardData.front.trim().length === 0)) {
        const error: any = new Error("Frente do card não pode estar vazia")
        error.statusCode = 400
        throw error
    }
    if (cardData.back !== undefined && (!cardData.back || cardData.back.trim().length === 0)) {
        const error: any = new Error("Verso do card não pode estar vazio")
        error.statusCode = 400
        throw error
    }

    //build update data
    const updateData: {
        front?: string;
        back?: string;
    } = {}
    if (cardData.front !== undefined) updateData.front = cardData.front.trim()
    if (cardData.back !== undefined) updateData.back = cardData.back.trim()

    //update card
    const updatedCard = await updateCard(cardId, updateData)
    return updatedCard
}

//validate that card exists
//validate that deck of card belongs to userId
//delete card
export const deleteCardService = async (cardId: string, userId: string) => {
    //validate that card exists
    const card = await findCardById(cardId)
    if (!card) {
        const error: any = new Error("Card não encontrado")
        error.statusCode = 404
        throw error
    }
    //validate that deck of card belongs to userId
    if (card.deck.userId !== userId) {
        const error: any = new Error("Card não pertence ao usuário")
        error.statusCode = 403
        throw error
    }
    //delete card
    const deletedCard = await deleteCard(cardId)
    return deletedCard
}

//find cards of user where nextReviewAt <= now()
//include deck information (name)
//return array ordered by nextReviewAt ASC
export const getCardsDueForReviewService = async (userId: string) => {
    const cards = await findCardsDueForReview(userId)
    return cards
}

