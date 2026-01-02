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
//Includes both new cards and cards that have been reviewed before
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

//find cards due for review by deck id
export const findCardsDueForReviewByDeckId = async (deckId: string) => {
    const now = new Date();
    // Add 1 second buffer to account for timing differences
    const nowWithBuffer = new Date(now.getTime() + 1000);
    return await prisma.card.findMany({
        where: {
            deckId: deckId,
            nextReviewAt: {
                lte: nowWithBuffer
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
            nextReviewAt: 'asc'
        }
    })
}

//find new cards (cards that have never been reviewed - no reviewHistory)
//These are cards ready to be studied for the first time
export const findNewCards = async (userId: string) => {
    const now = new Date();
    return await prisma.card.findMany({
        where: {
            deck: {
                userId: userId
            },
            reviewHistory: {
                none: {} // Never been reviewed
            },
            nextReviewAt: {
                lte: now // Ready to be reviewed
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
            createdAt: 'desc'
        }
    })
}

//find new cards by deck id
export const findNewCardsByDeckId = async (deckId: string) => {
    const now = new Date();
    // Add 1 second buffer to account for timing differences
    const nowWithBuffer = new Date(now.getTime() + 1000);
    return await prisma.card.findMany({
        where: {
            deckId: deckId,
            reviewHistory: {
                none: {}
            },
            nextReviewAt: {
                lte: nowWithBuffer
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
            createdAt: 'desc'
        }
    })
}

//find cards in learning (cards that have been reviewed but nextReviewAt is in the future and within 1 day)
export const findCardsInLearning = async (userId: string) => {
    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    return await prisma.card.findMany({
        where: {
            deck: {
                userId: userId
            },
            nextReviewAt: {
                gt: now,
                lte: oneDayFromNow
            },
            reviewHistory: {
                some: {}
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
            nextReviewAt: 'asc'
        }
    })
}

//find cards in learning by deck id
export const findCardsInLearningByDeckId = async (deckId: string) => {
    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    return await prisma.card.findMany({
        where: {
            deckId: deckId,
            nextReviewAt: {
                gt: now,
                lte: oneDayFromNow
            },
            reviewHistory: {
                some: {}
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
            nextReviewAt: 'asc'
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
        data: { nextReviewAt },
        include: {
            deck: true
        }
    })
}

//delete card by id
export const deleteCard = async (id: string) => {
    return await prisma.card.delete({
        where: { id }
    })
}
