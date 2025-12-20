import { Router } from 'express'
import { registerController, loginController } from '../controllers/authController'

const router = Router()

// auth routes
// POST /api/auth/register
router.post('/register', registerController)
// POST /api/auth/login
router.post('/login', loginController)

export default router

