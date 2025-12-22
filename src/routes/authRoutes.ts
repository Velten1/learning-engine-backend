import { Router } from 'express'
import { registerController, loginController, getUserProfileController, editUserProfileController} from '../controllers/authController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

// auth routes
// POST /api/auth/register
router.post('/register', registerController)
// POST /api/auth/login
router.post('/login', loginController)
// GET /api/auth/me
router.get('/me', authMiddleware, getUserProfileController)
// PUT /api/auth/me
router.put('/me', authMiddleware, editUserProfileController)
//make a route for renewtoken (futute)

export default router

