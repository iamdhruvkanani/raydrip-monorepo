import { Router, type Request, type Response, type NextFunction } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'

interface JwtPayload {
    id: number
    email: string
}

const router = Router()

// Extend Express Request to hold user property
interface AuthenticatedRequest extends Request {
    user?: JwtPayload
}

// Middleware to authenticate JWT token
function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Token required' })

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' })
        req.user = user as JwtPayload
        next()
    })
}

router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' })
    }

    try {
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        )
        res.status(201).json({ user: result.rows[0] })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' })
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        const user = result.rows[0]
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        })

        res.json({ token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

// Profile route - returns user details if authenticated
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const result = await pool.query('SELECT id, email, name FROM users WHERE id = $1', [req.user.id])
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' })

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

// Update user profile route (PUT)
router.put('/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
        const { name } = req.body
        if (!name) return res.status(400).json({ message: 'Name is required' })

        const result = await pool.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING id, email, name', [name, req.user.id])
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' })

        res.json(result.rows[0])
    } catch (error) {
        console.error('PUT /profile error:', error)
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : String(error) })
    }
})



export default router
