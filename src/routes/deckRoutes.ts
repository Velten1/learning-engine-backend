import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware'
import { createDeck} from '../controllers/deckController'

const router = Router()

// deck routes
// POST create deck
router.post('/', authMiddleware, createDeck)
/*// GET get all decks
router.get('/', authMiddleware, getAllDecks)
// GET get deck by id
router.get('/:id', authMiddleware, getDeckById)
// PUT update deck
router.put('/:id', authMiddleware, updateDeck)
// DELETE delete deck
router.delete('/:id', authMiddleware, deleteDeck)*/

export default router

