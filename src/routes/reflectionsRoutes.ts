import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { createReflection, getReflection, getReflectionsByPomodoroSessionId, getReflectionsByUserId, updateReflectionById, deleteReflectionById } from '../controllers/reflectionController'

const router = Router()

// POST /reflections
router.post('/', authMiddleware, createReflection)
// GET /reflections by pomodoro id (deve vir antes de /:id para evitar conflito)
router.get('/pomodoro/:id', authMiddleware, getReflectionsByPomodoroSessionId)
// GET /reflections by user id (deve vir antes de /:id para evitar conflito)
router.get('/user/all', authMiddleware, getReflectionsByUserId)
// GET /reflections by reflection id
router.get('/:id', authMiddleware, getReflection)
// PUT /reflections by reflection id
router.put('/:id', authMiddleware, updateReflectionById)
// DELETE /reflections by reflection id
router.delete('/:id', authMiddleware, deleteReflectionById)

export default router

