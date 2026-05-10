import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Estates API is running")
})

app.get("/api/properties", (req, res) => {
    res.json([
        {
            id: 1,
            title: "Elegant Villa in Marbella",
            location: "Marbella, Spain",
            price: "€2,400,000",
            images: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            ],
            bedrooms: 5,
            bathrooms: 4,
            size: 420,
            type: "villa"
        }
    ])
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})