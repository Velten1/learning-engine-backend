// Controller de reflexões
import { Request, Response } from 'express'
import { createReflectionService, getReflectionService } from '../services/reflectionService'

//extract userid from request
//extract from body the reflection data
//validade if obrigatory fields are filled
//call the service to create the reflection
//return the reflection created
export const createReflection = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        
        // extract the reflection data from the body
        const { pomodoroId, topic, whatIThought, whatItActuallyIs, summary, mandatoryQuestion, optionalQuestion } = req.body
        
        // validate if all mandatory fields are filled
        if (!pomodoroId || !topic || !whatIThought || !whatItActuallyIs || !summary || !mandatoryQuestion) {
            return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' })
        }
        
        // prepare the reflection data to be sent to the service
        const reflectionData = {
            pomodoroId,
            topic,
            whatIThought,
            whatItActuallyIs,
            summary,
            mandatoryQuestion,
            optionalQuestion: optionalQuestion || null,
        }
        
        // call the service to create the reflection
        const reflection = await createReflectionService(userId, reflectionData)
        return res.status(201).json(reflection)
    } catch (error: any) {
        console.error('Erro ao criar reflexão:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}

//extract userId from request
//extract id from route params
//validate if id is provided
//call the service to get the reflection
//return the reflection
export const getReflection = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string
        const reflectionId = req.params.id
        
        // validate if id is provided
        if (!reflectionId) {
            return res.status(400).json({ message: 'ID da reflexão é obrigatório' })
        }
        
        const reflection = await getReflectionService(userId, reflectionId)
        return res.status(200).json(reflection)
    } catch (error: any) {
        console.error('Erro ao obter reflexão:', error.message)
        const statusCode = error.statusCode || 500
        const message = error.message || 'Erro interno do servidor'
        return res.status(statusCode).json({ message: message })
    }
}