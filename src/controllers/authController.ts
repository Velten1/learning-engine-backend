//import auth service with business logic auth
import { getUserProfileService, loginService, registerService, editUserProfileService, renewTokenService, refreshTokenService } from '../services/authService'
import { Request, Response } from 'express'

//controll inputs from register 
export const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }
        const response = await registerService(email, password, name)
        
        // If registration is successful, save token in cookie httpOnly
        // backend needs to save refresh token in cookie, its save because stay on backend
        if (response.status === 201 && response.data?.refreshToken) {
            res.cookie('refreshToken', response.data.refreshToken, {
                httpOnly: true,     
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
        }
        
        return res.status(201).json({ message: 'Usuário registrado com sucesso', data: response.data })
    } catch (error: any) {
        console.error('Erro ao cadastrar usuario:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

// controll inputs from login
export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }
        const response = await loginService(email, password)
        
        // if login is successful, save token in cookie httpOnly
        if (response.status === 200 && response.data?.refreshToken) {
            res.cookie('refreshToken', response.data.refreshToken, {
                httpOnly: true,     
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',  
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
        }
        
        // Return response with token in JSON (appears in Postman)
        return res.status(response.status).json(response)
    } catch (error: any) {
        console.error('Erro ao fazer login:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//pickup user id from request
//send to service to get user profile
//return user profile
export const getUserProfileController = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const userProfile = await getUserProfileService(userId as string)
        return res.status(200).json(userProfile)
    } catch (error: any) {
        console.error('Erro ao obter o perfil do usuário:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//pick up user id from request
//pick up userData from body
//verify if userData is filled, if not return error
//send to service edit profile
//return user profile
export const editUserProfileController = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const userData = req.body
        const allowedFields = ['name', 'email']
        const hasValidField = allowedFields.some(field => field in userData)

        if (!hasValidField) {
            return res.status(400).json({ message: 'Nenhum campo foi preenchido para ser editado' })
        }

        const response = await editUserProfileService(userId as string, userData)
        return res.status(200).json(response)
    } catch (error: any) {
        console.error('Erro ao editar o perfil do usuário:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//pick up user id from request (from authMiddleware)
//send to service to renew token
//save new token in cookie
//return new token
export const renewTokenController = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const response = await renewTokenService(userId)
        
        // Save new token in cookie httpOnly
        if (response.status === 200 && response.data?.token) {
            res.cookie('token', response.data.token, {
                httpOnly: true,     
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict',  
                maxAge: 3600000     // 1 hour
            });
        }
        
        return res.status(200).json(response)
    } catch (error: any) {
        console.error('Erro ao renovar token:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//logout controller
//revoke refresh token from database
//clear refreshToken cookie
//return success message
export const logoutController = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const refreshToken = req.cookies?.refreshToken
        
        // If we have a refresh token, revoke it from database
        if (refreshToken) {
            try {
                const { revokeRefreshToken, revokeAllRefreshTokensByUserId } = await import('../repository/refreshTokenRepository')
                // Try to revoke the specific token first
                await revokeRefreshToken(refreshToken)
                // Also revoke all tokens for this user as a security measure
                await revokeAllRefreshTokensByUserId(userId)
            } catch (error) {
                // If revoking fails, continue with cookie clearing
                console.error('Erro ao revogar refresh token:', error)
            }
        }
        
        // Clear refreshToken cookie with same options used when setting it
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        
        // Also try to set an empty cookie with maxAge 0 to ensure it's deleted
        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 0, // Expire immediately
        });
        
        return res.status(200).json({ message: 'Logout realizado com sucesso' })
    } catch (error: any) {
        console.error('Erro ao fazer logout:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//refresh token controller
//read refreshToken from cookie (not from body)
//call service to refresh token
//save new token in cookie
//return new access token (frontend save it in localStorage)
export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({ message: 'Token de refresh não encontrado' })
        }

        const response = await refreshTokenService(refreshToken)
        if (response.status === 200 && response.data?.refreshToken) {
            res.cookie('refreshToken', response.data.refreshToken, {
                httpOnly: true,     
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',  
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
        }
        return res.status(200).json({status: 200, data: {accessToken: response.data?.accessToken}})
    } catch (error: any) {
        console.error('Erro ao renovar token:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}