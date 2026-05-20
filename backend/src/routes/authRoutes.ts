import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

type User = {
    id: number
    name: string
    email: string
    password: string
}

const users: User[] = []

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const existingUser = users.find(user => user.email === email)

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    }

    users.push(user)

    res.status(201).json({ message: "Account created successfully" })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = users.find(user => user.email === email)

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    )

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
})

export default router