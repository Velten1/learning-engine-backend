import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import {
    createCard,
    getCardById,
    getCardsByDeckId,
    updateCard,
    deleteCard,
    getCardsDueForReview,
    getNewCards,
    getCardsInLearning,
    getDeckStats,
    getDecksWithStats,
} from '../controllers/cardController'

const router = Router()

// card routes
// POST create card
router.post('/', authMiddleware, createCard)
// GET stats routes (must be before /:id to avoid conflicts)
router.get('/stats/new', authMiddleware, getNewCards)
router.get('/stats/learning', authMiddleware, getCardsInLearning)
router.get('/stats/due', authMiddleware, getCardsDueForReview)
// GET all decks with stats (must be before /deck/:deckId to avoid conflicts)
router.get('/decks/stats', authMiddleware, getDecksWithStats)
// GET deck stats
router.get('/deck/:deckId/stats', authMiddleware, getDeckStats)
// GET get cards by deck id
router.get('/deck/:deckId', authMiddleware, getCardsByDeckId)
// GET get card by id (must be last to avoid conflicts)
router.get('/:id', authMiddleware, getCardById)
// PUT update card
router.put('/:id', authMiddleware, updateCard)
// DELETE delete card
router.delete('/:id', authMiddleware, deleteCard)

export default router


