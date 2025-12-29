//deck service

import { createDeckRepository } from "../repository/deckRepository"

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