import mongoose from "mongoose"

const propertySchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: String,
        location: String,
        district: String,
        type: String,
        status: String,
        price: Number,
        bedrooms: Number,
        bathrooms: Number,
        size: Number,
        outdoorSize: Number,
        yearBuilt: Number,
        parkingSpaces: Number,
        energyRating: String,
        furnished: Boolean,
        amenities: [String],
        images: [String],
        description: String,
        contactPerson: {
            name: String,
            email: String,
            phone: String
        }
    },
    {
        timestamps: true
    }
)

export const PropertyModel = mongoose.model("Property", propertySchema)