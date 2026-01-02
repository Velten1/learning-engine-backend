// Repository de Review History

import prisma from "../config/prisma";

//create review history
export const createReviewHistory = async (cardId: string, rating: 'WRONG' | 'GOOD' | 'EASY') => {
    return await prisma.reviewHistory.create({
        data: {
            cardId,
            rating
        }
    })
}

//find review history by card id (opcional, para estatísticas futuras)
export const findReviewHistoryByCardId = async (cardId: string) => {
    return await prisma.reviewHistory.findMany({
        where: { cardId },
        orderBy: { reviewedAt: 'desc' }
    })
}


