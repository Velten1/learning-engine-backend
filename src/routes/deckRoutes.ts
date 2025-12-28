import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

// deck routes
// GET get today stats
router.get('/', authMiddleware, getDecks)
// GET get deck by id
router.get('/:id', authMiddleware, getDeckById)
// POST create deck
router.post('/', authMiddleware, createDeck)
// PUT update deck
router.put('/:id', authMiddleware, updateDeck)
// DELETE delete deck
router.delete('/:id', authMiddleware, deleteDeck)

export default router

