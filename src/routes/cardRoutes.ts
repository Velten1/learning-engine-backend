import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import {
    createCard,
    getCardById,
    getCardsByDeckId,
    updateCard,
    deleteCard
} from '../controllers/cardController'

const router = Router()

// card routes
// POST create card
router.post('/', authMiddleware, createCard)
// GET get card by id
router.get('/:id', authMiddleware, getCardById)
// GET get cards by deck id
router.get('/deck/:deckId', authMiddleware, getCardsByDeckId)
// PUT update card
router.put('/:id', authMiddleware, updateCard)
// DELETE delete card
router.delete('/:id', authMiddleware, deleteCard)

export default router

