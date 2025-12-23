import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { createReflection } from '../controllers/reflectionController'

const router = Router()

// POST /reflections
router.post('/', authMiddleware, createReflection)

export default router

