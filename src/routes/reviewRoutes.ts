import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import {
    reviewCard,
    getCardsDueForReview
} from '../controllers/reviewController'

const router = Router()

// POST review a card
router.post('/', authMiddleware, reviewCard)
// GET get cards due for review
router.get('/due', authMiddleware, getCardsDueForReview)

export default router


