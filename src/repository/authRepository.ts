// auth repo prisma
import prisma from '../config/prisma'
import jwt from 'jsonwebtoken'

// search user by email in databse
export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}

// create user in database
export const createUser = async (email: string, password: string, name: string) => {
    return await prisma.user.create({
        data: { email, password, name }
    })
}

// generate token jwt with user id
export const generateToken = (userId: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET não configurado')
    }
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}