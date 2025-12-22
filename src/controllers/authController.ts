//import auth service with business logic auth
import { getUserProfileService, loginService, registerService, editUserProfileService } from '../services/authService'
import { Request, Response } from 'express'

//controll inputs from register 
export const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }
        const response = await registerService(email, password, name)
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
        if (response.status === 200 && response.data?.token) {
            res.cookie('token', response.data.token, {
                httpOnly: true,     
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict',  
                maxAge: 3600000     
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