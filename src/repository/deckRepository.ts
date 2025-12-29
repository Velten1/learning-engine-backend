// Repository de Decks

import prisma from "../config/prisma";

//create deck
export const createDeckRepository = async (userId: string, name: string, description: string | null) => {
    return await prisma.deck.create({
        data: { 
            userId, 
            name, 
            description: description || undefined 
        }
    })
}

//find deck by id
export const findDeckById = async (id: string) => {
    return await prisma.deck.findUnique({
        where: { id }
    })
}

//find decks by user id
export const findDecksByUserId = async (userId: string) => {
    return await prisma.deck.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })
}

//update deck by id
export const updateDeckById = async (
    id: string,
    data: {
        name?: string;
        description?: string | null;
    }
) => {
    // Build data object only with provided fields
    const updateData: any = {};
    if (data.name !== undefined)
        updateData.name = data.name;
    if (data.description !== undefined)
        updateData.description = data.description;

    return await prisma.deck.update({
        where: { id },
        data: updateData
    })
}

//delete deck by id
export const deleteDeckById = async (id: string) => {
    return await prisma.deck.delete({
        where: { id }
    })
}