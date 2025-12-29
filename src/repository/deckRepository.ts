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