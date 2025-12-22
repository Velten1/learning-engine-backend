import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import pomodoroRoutes from './routes/pomodoroRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

//make a route to auth routes
app.use('/api/auth', authRoutes)

//make a route to pomodoro routes
app.use('/api/pomodoro', pomodoroRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
