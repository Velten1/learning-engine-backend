import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { startPause } from '../controllers/pauseController'

const router = Router()

//pauses routes
// POST /pauses/
router.post('/', authMiddleware, startPause)

export default router