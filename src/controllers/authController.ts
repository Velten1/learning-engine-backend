//import auth service with business logic auth
import { loginService, registerService } from '../services/authService'
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