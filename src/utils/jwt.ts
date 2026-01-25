//jwt utils

import jwt from 'jsonwebtoken'

interface TokenPayload {
  userId: string;
  exp?: number;
  iat?: number;
}

// Helper para validar e obter secrets
const getAccessSecret = (): string => {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET_ACCESS
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET não configurado')
  }
  return secret
}

const getRefreshSecret = (): string => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET_REFRESH
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET não configurado')
  }
  return secret
}

//generate access token (15 min)
export const generateAccessToken = (userId: string): string => {
  try {
    const secret = getAccessSecret()
    return jwt.sign({ userId }, secret, { expiresIn: '15m' })
  } catch (error) {
    console.error('Erro ao gerar token de acesso:', error)
    throw new Error('Erro ao gerar token de acesso')
  }
}

//verify access token
export const verifyAccessToken = (token: string): string => {
  try {
    const secret = getAccessSecret()
    const decoded = jwt.verify(token, secret) as TokenPayload
    return decoded.userId
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token de acesso expirado')
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Token de acesso inválido')
    }
    console.error('Erro ao verificar token de acesso:', error)
    throw new Error('Erro ao verificar token de acesso')
  }
}

//generate refresh token (7d)
export const generateRefreshToken = (userId: string): string => {
  try {
    const secret = getRefreshSecret()
    return jwt.sign({ userId }, secret, { expiresIn: '7d' })
  } catch (error) {
    console.error('Erro ao gerar token de refresh:', error)
    throw new Error('Erro ao gerar token de refresh')
  }
}

//verify refresh token
export const verifyRefreshToken = (token: string): string => {
  try {
    const secret = getRefreshSecret()
    const decoded = jwt.verify(token, secret) as TokenPayload
    return decoded.userId
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token de refresh expirado')
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Token de refresh inválido')
    }
    console.error('Erro ao verificar token de refresh:', error)
    throw new Error('Erro ao verificar token de refresh')
  }
}