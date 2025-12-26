import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import {
  getRandomQuestion,
  getAllQuestions,
  getQuestionById
} from '../controllers/questionController'

const router = Router()

// question routes
// GET get random question
router.get('/random', authMiddleware, getRandomQuestion)
// GET get all questions
router.get('/', authMiddleware, getAllQuestions)
// GET get question by id
router.get('/:id', authMiddleware, getQuestionById)

export default router

