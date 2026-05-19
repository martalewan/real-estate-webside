import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import propertyRoutes from "./routes/propertyRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ limit: "20mb", extended: true }))

app.get("/", (_req, res) => {
    res.send("Estates API is running")
})

app.use("/api/properties", propertyRoutes)
app.use("/api/contact", contactRoutes)

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})