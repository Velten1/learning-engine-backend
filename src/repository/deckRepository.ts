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

//find decks by user id
export const findDecksByUserId = async (userId: string) => {
    return await prisma.deck.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })
}