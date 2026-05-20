import express from "express"

import {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty
} from "../controllers/propertyController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getProperties)
router.get("/:id", getProperty)

router.post("/", protect, createProperty)
router.put("/:id", protect, updateProperty)
router.delete("/:id", protect, deleteProperty)

export default router