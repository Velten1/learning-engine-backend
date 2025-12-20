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
        await registerService(email, password, name)
        return res.status(201).json({ message: 'Usuário registrado com sucesso' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor', error: error })
    }
}

// controll inputs from login
export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }
        await loginService(email, password)
        return res.status(200).json({ message: 'Login realizado com sucesso' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor', error: error })
    }
}