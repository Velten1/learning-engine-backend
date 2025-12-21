import { Router } from 'express'
import { startPomodoro, abandonmentPomodoro, getCurrentPomodoro } from '../controllers/pomodoroController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

// pomodoro routes
// POST /pomodoro/start
router.post('/start', authMiddleware, startPomodoro)
// POST /pomodoro/abandon
router.post('/abandon', authMiddleware, abandonmentPomodoro)
// GET /pomodoro/currentPomodoro
router.get('/current', authMiddleware, getCurrentPomodoro)



export default router

