import {
    createCard,
    findCardById,
    findCardsByDeckId,
    updateCard,
    deleteCard,
    findCardsDueForReview,
    findNewCards,
    findCardsInLearning,
    findCardsDueForReviewByDeckId,
    findNewCardsByDeckId,
    findCardsInLearningByDeckId,
} from "../repository/cardRepository";
import { findDeckById, findDecksByUserId } from "../repository/deckRepository";

export const createCardService = async (
    userId: string,
    deckId: string,
    front: string,
    back: string
) => {
    const deck = await findDeckById(deckId);
    if (!deck) {
        const error: any = new Error("Deck não encontrado");
        error.statusCode = 404;
        throw error;
    }
    if (deck.userId !== userId) {
        const error: any = new Error("Deck não pertence ao usuário");
        error.statusCode = 403;
        throw error;
    }
    if (!front || front.trim().length === 0) {
        const error: any = new Error("Frente do card não pode estar vazia");
        error.statusCode = 400;
        throw error;
    }
    if (!back || back.trim().length === 0) {
        const error: any = new Error("Verso do card não pode estar vazio");
        error.statusCode = 400;
        throw error;
    }
    const card = await createCard(deckId, front, back);
    return card;
};

export const getCardByIdService = async (cardId: string, userId: string) => {
    const card = await findCardById(cardId);
    if (!card) {
        const error: any = new Error("Card não encontrado");
        error.statusCode = 404;
        throw error;
    }
    if (card.deck.userId !== userId) {
        const error: any = new Error("Card não pertence ao usuário");
        error.statusCode = 403;
        throw error;
    }
    return card;
};

export const getCardsByDeckIdService = async (deckId: string, userId: string) => {
    const deck = await findDeckById(deckId);
    if (!deck) {
        const error: any = new Error("Deck não encontrado");
        error.statusCode = 404;
        throw error;
    }
    if (deck.userId !== userId) {
        const error: any = new Error("Deck não pertence ao usuário");
        error.statusCode = 403;
        throw error;
    }
    const cards = await findCardsByDeckId(deckId);
    return cards;
};

export const updateCardService = async (
    cardId: string,
    userId: string,
    cardData: { front?: string; back?: string }
) => {
    const card = await findCardById(cardId);
    if (!card) {
        const error: any = new Error("Card não encontrado");
        error.statusCode = 404;
        throw error;
    }
    if (card.deck.userId !== userId) {
        const error: any = new Error("Card não pertence ao usuário");
        error.statusCode = 403;
        throw error;
    }
    if (cardData.front !== undefined && cardData.front.trim().length === 0) {
        const error: any = new Error("Frente do card não pode estar vazia");
        error.statusCode = 400;
        throw error;
    }
    if (cardData.back !== undefined && cardData.back.trim().length === 0) {
        const error: any = new Error("Verso do card não pode estar vazio");
        error.statusCode = 400;
        throw error;
    }
    const updatedCard = await updateCard(cardId, cardData);
    return updatedCard;
};

export const deleteCardService = async (cardId: string, userId: string) => {
    const card = await findCardById(cardId);
    if (!card) {
        const error: any = new Error("Card não encontrado");
        error.statusCode = 404;
        throw error;
    }
    if (card.deck.userId !== userId) {
        const error: any = new Error("Card não pertence ao usuário");
        error.statusCode = 403;
        throw error;
    }
    const deletedCard = await deleteCard(cardId);
    return deletedCard;
};

//find cards of user where nextReviewAt <= now()
//include deck information (name)
//return array ordered by nextReviewAt ASC
export const getCardsDueForReviewService = async (userId: string) => {
    const cards = await findCardsDueForReview(userId)
    return cards
}

//get new cards (never reviewed)
export const getNewCardsService = async (userId: string) => {
    const cards = await findNewCards(userId)
    return cards
}

//get cards in learning (reviewed but nextReviewAt is in the future within 1 day)
export const getCardsInLearningService = async (userId: string) => {
    const cards = await findCardsInLearning(userId)
    return cards
}

//get deck statistics (new, learning, due) for a specific deck
export const getDeckStatsService = async (deckId: string, userId: string) => {
    const deck = await findDeckById(deckId);
    if (!deck) {
        const error: any = new Error("Deck não encontrado");
        error.statusCode = 404;
        throw error;
    }
    if (deck.userId !== userId) {
        const error: any = new Error("Deck não pertence ao usuário");
        error.statusCode = 403;
        throw error;
    }

    const [newCards, learningCards, dueCards] = await Promise.all([
        findNewCardsByDeckId(deckId),
        findCardsInLearningByDeckId(deckId),
        findCardsDueForReviewByDeckId(deckId),
    ]);

    console.log(`Deck ${deck.name} (${deckId}) stats:`, {
        new: newCards.length,
        learning: learningCards.length,
        due: dueCards.length,
        newCards: newCards.map(c => ({ id: c.id, nextReviewAt: c.nextReviewAt })),
        dueCards: dueCards.map(c => ({ id: c.id, nextReviewAt: c.nextReviewAt })),
    });

    return {
        new: newCards.length,
        learning: learningCards.length,
        due: dueCards.length,
    };
}

//get all decks with their statistics for a user
export const getDecksWithStatsService = async (userId: string) => {
    const decks = await findDecksByUserId(userId);
    
    const decksWithStats = await Promise.all(
        decks.map(async (deck) => {
            const [newCards, learningCards, dueCards] = await Promise.all([
                findNewCardsByDeckId(deck.id),
                findCardsInLearningByDeckId(deck.id),
                findCardsDueForReviewByDeckId(deck.id),
            ]);

            return {
                id: deck.id,
                name: deck.name,
                description: deck.description,
                createdAt: deck.createdAt,
                updatedAt: deck.updatedAt,
                stats: {
                    new: newCards.length,
                    learning: learningCards.length,
                    due: dueCards.length,
                }
            };
        })
    );

    return decksWithStats;
}
