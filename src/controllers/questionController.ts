// Controller de Question
import { Request, Response } from 'express'
import {
  getRandomQuestionService,
  getAllQuestionsService,
  getQuestionByIdService
} from '../services/questionService'

//extract userId from request (optional)
//call the service to get random question
//return random question or error
export const getRandomQuestion = async (req: Request, res: Response) => {
  try {
    const question = await getRandomQuestionService()
    return res.status(200).json(question)
  } catch (error: any) {
    console.error('Erro ao obter a questão aleatória:', error.message)
    const statusCode = error.statusCode || 500
    const message = error.message || 'Erro interno do servidor'
    return res.status(statusCode).json({ message: message })
  }
}

//extract userId from req (optional)
//call the service to get all questions
//return all questions or error
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await getAllQuestionsService()
    return res.status(200).json(questions)
  } catch (error: any) {
    console.error('Erro ao obter todas as questões:', error.message)
    const statusCode = error.statusCode || 500
    const message = error.message || 'Erro interno do servidor'
    return res.status(statusCode).json({ message: message })
  }
}

//extract id from req.params
//call the service to get question by id
//return question or 404 if not found
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const question = await getQuestionByIdService(id)
    return res.status(200).json(question)
  } catch (error: any) {
    console.error('Erro ao obter questão por ID:', error.message)
    const statusCode = error.statusCode || 500
    const message = error.message || 'Erro interno do servidor'
    return res.status(statusCode).json({ message: message })
  }
}
