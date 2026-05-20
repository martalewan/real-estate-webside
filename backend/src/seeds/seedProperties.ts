import dotenv from "dotenv"

import { connectDB } from "../config/db.js"
import { PropertyModel } from "../models/Property.js"

import { properties } from "../data.js"

dotenv.config()

const OWNER_ID = process.env.SEED_OWNER_ID as string

async function seed() {
    try {
        await connectDB()

        await PropertyModel.deleteMany()

        const formattedProperties = properties.map(
            (property) => ({
                ...property,
                ownerId: OWNER_ID
            })
        )

        await PropertyModel.insertMany(
            formattedProperties
        )

        console.log(
            "Properties seeded successfully"
        )

        process.exit()

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

seed()