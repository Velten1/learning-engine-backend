// Repository de Cards

import prisma from "../config/prisma";

//create card with nextReviewAt = now()
export const createCard = async (deckId: string, front: string, back: string) => {
    return await prisma.card.create({
        data: {
            deckId,
            front,
            back,
            nextReviewAt: new Date(), // Card disponível imediatamente para revisão
        }
    })
}

//find card by id
export const findCardById = async (id: string) => {
    return await prisma.card.findUnique({
        where: { id },
        include: {
            deck: true
        }
    })
}

//find cards by deck id
export const findCardsByDeckId = async (deckId: string) => {
    return await prisma.card.findMany({
        where: { deckId },
        orderBy: { createdAt: 'desc' }
    })
}

//find cards due for review (nextReviewAt <= now) for a specific user
export const findCardsDueForReview = async (userId: string) => {
    const now = new Date();
    return await prisma.card.findMany({
        where: {
            deck: {
                userId: userId
            },
            nextReviewAt: {
                lte: now
            }
        },
        include: {
            deck: {
                select: {
                    id: true,
                    name: true,
                    userId: true
                }
            }
        },
        orderBy: {
            nextReviewAt: 'asc' // Mais antigos primeiro
        }
    })
}

//update card (front and/or back)
export const updateCard = async (
    id: string,
    data: {
        front?: string;
        back?: string;
    }
) => {
    const updateData: any = {};
    if (data.front !== undefined) updateData.front = data.front;
    if (data.back !== undefined) updateData.back = data.back;

    return await prisma.card.update({
        where: { id },
        data: updateData
    })
}

//update card nextReviewAt
export const updateCardNextReview = async (id: string, nextReviewAt: Date) => {
    return await prisma.card.update({
        where: { id },
        data: { nextReviewAt }
    })
}

//delete card by id
export const deleteCard = async (id: string) => {
    return await prisma.card.delete({
        where: { id }
    })
}

