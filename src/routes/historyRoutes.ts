import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { getTodayStats, getLifetimeStats } from '../controllers/historyController'

const router = Router()

// history routes
// GET get today stats
router.get('/today', authMiddleware, getTodayStats)
// GET get lifetime stats 
router.get('/lifetime', authMiddleware, getLifetimeStats)

export default router

