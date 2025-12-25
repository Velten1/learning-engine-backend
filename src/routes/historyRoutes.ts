import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { getTodayStats } from '../controllers/historyController'

const router = Router()

// history routes
// GET get today stats
router.get('/today', authMiddleware, getTodayStats)

export default router

