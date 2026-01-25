//repo refresh token 

import prisma from '../config/prisma'

//create new refresh token
export const createRefreshToken = async (userId: string, token: string, expiresAt: Date) => {
    return await prisma.refreshToken.create({
        data: {
            userId,
            token,
            expiresAt
        }
    })
}

//fetch refresh token by token (only valid, non-revoked, non-expired tokens)
export const fetchRefreshToken = async (token: string) => {
    const now = new Date()
    return await prisma.refreshToken.findFirst({
        where: { 
            token,
            revoked: false,
            expiresAt: {
                gt: now // expiresAt > now (not expired)
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            }
        }
    })
}

//revoke refresh token mark as revoked (safe - won't throw if token doesn't exist)
export const revokeRefreshToken = async (token: string) => {
    return await prisma.refreshToken.updateMany({
        where: { 
            token,
            revoked: false // only revoke if not already revoked
        },
        data: { revoked: true }
    })
}

//revoke all refresh tokens by user id
export const revokeAllRefreshTokensByUserId = async (userId: string) => {
    return await prisma.refreshToken.updateMany({
        where: { 
            userId,
            revoked: false // only revoke if not already revoked
        },
        data: { revoked: true }
    })
}

//delete expired refresh tokens (maintenance function - optional)
export const deleteExpiredRefreshTokens = async () => {
    const now = new Date()
    return await prisma.refreshToken.deleteMany({
        where: {
            expiresAt: {
                lt: now // expiresAt < now (expired)
            }
        }
    })
}
