import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { createDeck, getDeckByUserId} from '../controllers/deckController'

const router = Router()

// deck routes
// POST create deck
router.post('/', authMiddleware, createDeck)
// GET get deck by id
router.get('/:id', authMiddleware, getDeckByUserId)
/*// GET get all decks
router.get('/:id', authMiddleware, getAllDecks)
// PUT update deck
router.put('/:id', authMiddleware, updateDeck)
// DELETE delete deck
router.delete('/:id', authMiddleware, deleteDeck)*/

export default router

