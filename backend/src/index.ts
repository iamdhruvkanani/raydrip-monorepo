import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/user.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
