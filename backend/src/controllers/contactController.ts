import { Request, Response } from "express"

export function createContactMessage(req: Request, res: Response) {
    const { name, email, message, propertyId } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Name, email and message are required"
        })
    }

    res.status(201).json({
        message: "Message received successfully",
        data: {
            name,
            email,
            message,
            propertyId: propertyId || null
        }
    })
}