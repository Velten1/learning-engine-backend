import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { createReflection, getReflection } from '../controllers/reflectionController'

const router = Router()

// POST /reflections
router.post('/', authMiddleware, createReflection)
// GET /reflections/:id
router.get('/:id', authMiddleware, getReflection)

export default router

