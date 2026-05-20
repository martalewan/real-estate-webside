import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import propertyRoutes from "./routes/propertyRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js"

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5001

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ limit: "20mb", extended: true }))

app.get("/", (_req, res) => {
    res.send("Estates API is running")
})

app.use("/api/properties", propertyRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})