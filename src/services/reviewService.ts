// Service de Reviews

import { createReviewHistory } from "../repository/reviewRepository"
import { findCardById, updateCardNextReview } from "../repository/cardRepository"
import { getCardsDueForReviewService as getCardsDueForReview } from "./cardService"

//validate that card exists
//validate that deck of card belongs to userId
//validate rating (WRONG, GOOD, EASY)
//create ReviewHistory
//calculate next nextReviewAt:
//  WRONG: now() + 3 minutes
//  GOOD: now() + 10 minutes
//  EASY: now() + 1 day
//update card with new nextReviewAt
//return updated card
export const reviewCardService = async (userId: string, cardId: string, rating: 'WRONG' | 'GOOD' | 'EASY') => {
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
    //validate rating (WRONG, GOOD, EASY)
    if (!['WRONG', 'GOOD', 'EASY'].includes(rating)) {
        const error: any = new Error("Rating inválido. Deve ser WRONG, GOOD ou EASY")
        error.statusCode = 400
        throw error
    }

    //create ReviewHistory
    await createReviewHistory(cardId, rating)

    //calculate next nextReviewAt based on rating
    const now = new Date()
    let nextReviewAt: Date

    switch (rating) {
        case 'WRONG':
            // +3 minutos
            nextReviewAt = new Date(now.getTime() + 3 * 60 * 1000)
            break
        case 'GOOD':
            // +10 minutos
            nextReviewAt = new Date(now.getTime() + 10 * 60 * 1000)
            break
        case 'EASY':
            // +1 dia
            nextReviewAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
            break
    }

    //update card with new nextReviewAt
    const updatedCard = await updateCardNextReview(cardId, nextReviewAt)
    
    //return updated card with deck info
    return updatedCard
}

//delegate to cardService.getCardsDueForReviewService(userId)
//return cards ready for review
export const getCardsDueForReviewService = async (userId: string) => {
    return await getCardsDueForReview(userId)
}

