// Service de Decks

import { 
    createDeckRepository, 
    findDeckById,
    findDecksByUserId,
    updateDeckById,
    deleteDeckById
} from "../repository/deckRepository"

//validate that name is not empty or just whitespace
//validate that name has maximum 100 characters
//call the repository to create the deck
//return the deck created
export const createDeckService = async (userId: string, name: string, description: string | null) => {
    //validate that name is not empty or just whitespace
    if (!name || name.trim().length === 0) {
        const error: any = new Error('Nome do baralho não pode estar vazio')
        error.statusCode = 400
        throw error
    }
    //validate that name has maximum 100 characters
    if (name.length > 100) {
        const error: any = new Error('Nome do baralho não pode ter mais de 100 caracteres')
        error.statusCode = 400
        throw error
    }
    //call the repository to create the deck
    const deck = await createDeckRepository(userId, name, description)
    //return the deck created
    return deck
}

//verify if deck exists
//verify if deck is from userId
//if validations are ok, call the repository to get the deck
//returns deck
export const getDeckByIdService = async (deckId: string, userId: string) => {
    // verify if deck exists
    const deck = await findDeckById(deckId)
    if (!deck) {
        const error: any = new Error("Baralho não encontrado")
        error.statusCode = 404
        throw error
    }
    // verify if deck is from userId
    if (deck.userId !== userId) {
        const error: any = new Error("Baralho não pertence ao usuário")
        error.statusCode = 403
        throw error
    }
    // if validations are ok, call the repository to get the deck
    return deck
}

//call repository to get all decks by user id
//return array of decks
export const getDecksByUserIdService = async (userId: string) => {
    // call the repository to get all decks by user id
    const decks = await findDecksByUserId(userId)
    // findMany always returns an array (can be empty), no need to verify null
    return decks
}

//verify if deck exists
//verify if deck is from userId
//if validations are ok, call the repository to update the deck
//returns deck updated
export const updateDeckService = async (
    deckId: string,
    userId: string,
    deckData: {
        name?: string;
        description?: string | null;
    }
) => {
    // verify if deck exists
    const deck = await findDeckById(deckId)
    if (!deck) {
        const error: any = new Error("Baralho não encontrado")
        error.statusCode = 404
        throw error
    }
    // verify if deck is from userId
    if (deck.userId !== userId) {
        const error: any = new Error("Baralho não pertence ao usuário")
        error.statusCode = 403
        throw error
    }
    // validate: if name was provided and is empty or just whitespace
    if (deckData.name !== undefined && (!deckData.name || deckData.name.trim().length === 0)) {
        const error: any = new Error('Nome do baralho não pode estar vazio')
        error.statusCode = 400
        throw error
    }
    // validate: if name was provided and has more than 100 characters
    if (deckData.name !== undefined && deckData.name.length > 100) {
        const error: any = new Error('Nome do baralho não pode ter mais de 100 caracteres')
        error.statusCode = 400
        throw error
    }
    // Build update data only with provided fields
    const updateData: {
        name?: string;
        description?: string | null;
    } = {};

    if (deckData.name !== undefined)
        updateData.name = deckData.name;
    if (deckData.description !== undefined)
        updateData.description = deckData.description;

    // if validations are ok, call the repository to update the deck
    const updatedDeck = await updateDeckById(deckId, updateData)
    return updatedDeck
}

//verify if deck exists
//verify if deck is from userId
//if validations are ok, call the repository to delete the deck
//returns deck deleted
export const deleteDeckService = async (deckId: string, userId: string) => {
    // verify if deck exists
    const deck = await findDeckById(deckId)
    if (!deck) {
        const error: any = new Error("Baralho não encontrado")
        error.statusCode = 404
        throw error
    }
    // verify if deck is from userId
    if (deck.userId !== userId) {
        const error: any = new Error("Baralho não pertence ao usuário")
        error.statusCode = 403
        throw error
    }
    // if validations are ok, call the repository to delete the deck
    const deletedDeck = await deleteDeckById(deckId)
    return deletedDeck
}