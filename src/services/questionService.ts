// Service de Question

import {
  getRandomQuestion,
  getAllQuestions,
  getQuestionById
} from '../repository/questionRepository'

//fetch a random question on db
//if return null is because dont have any active questions
//throw error 404
//return object with id, text and category
export const getRandomQuestionService = async () => {
  const question = await getRandomQuestion()
  if (!question) {
    const error: any = new Error('Não há questões ativas')
    error.statusCode = 404
    throw error
  }
  return { id: question.id, text: question.text, category: question.category }
}

//receive no params and call the repository to get all questions
//return array of all questions
export const getAllQuestionsService = async () => {
  const questions = await getAllQuestions()
  return questions
}

//receive questionId and call the repository to get question by id
//if not exists, throw error 404
//return question
export const getQuestionByIdService = async (questionId: string) => {
  const question = await getQuestionById(questionId)
  if (!question) {
    const error: any = new Error('Pergunta não encontrada')
    error.statusCode = 404
    throw error
  }
  return question
}

