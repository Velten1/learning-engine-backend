import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes'
import pomodoroRoutes from './routes/pomodoroRoutes'
import reflectionsRoutes from './routes/reflectionsRoutes'
import historyRoutes from './routes/historyRoutes'
import questionRoutes from './routes/questionRoutes'
import deckRoutes from './routes/deckRoutes'
import cardRoutes from './routes/cardRoutes'
import reviewRoutes from './routes/reviewRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Configuração de CORS - permite apenas o domínio específico do frontend
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
// Normalizar a URL (remover barra no final se existir)
const normalizedFrontendUrl = FRONTEND_URL.replace(/\/$/, '')

app.use(cors({
  origin: normalizedFrontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())
app.use(cookieParser())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

//make a route to auth routes
app.use('/api/auth', authRoutes)

//make a route to pomodoro routes
app.use('/api/pomodoro', pomodoroRoutes)

//make a route to reflections routes
app.use('/api/reflections', reflectionsRoutes)

//make a route to history routes
app.use('/api/history', historyRoutes)

//make a route to question routes
app.use('/api/questions', questionRoutes)

//make a route to deck routes
app.use('/api/decks', deckRoutes)

//make a route to card routes
app.use('/api/cards', cardRoutes)

//make a route to review routes
app.use('/api/reviews', reviewRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
