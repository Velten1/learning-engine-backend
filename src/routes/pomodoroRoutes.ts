import { Router } from 'express'
import { startPomodoro, abandonmentPomodoro, getCurrentPomodoro, completePomodoro, resetPomodoro } from '../controllers/pomodoroController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

// pomodoro routes
// POST /pomodoro/start
router.post('/start', authMiddleware, startPomodoro)
// POST /pomodoro/abandon
router.post('/abandon', authMiddleware, abandonmentPomodoro)
// GET /pomodoro/currentPomodoro
router.get('/current', authMiddleware, getCurrentPomodoro)
// POST /pomodoro/complete
router.post('/complete', authMiddleware, completePomodoro)
// POST /pomodoro/reset
router.post('/reset', authMiddleware, resetPomodoro)


export default router

