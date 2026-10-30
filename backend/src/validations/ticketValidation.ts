import {z} from "zod"

export const createTicketSchema = z.object({
    subject:z.string().trim().min(3,"Subject must be at least 3 characters").max(150),
    description: z.string().trim().min(10,"Description must be at least 10 characters").max(250),
    categoryId: z.number().int().positive(),
    priority: z.enum(["LOW","MEDIUM","HIGH","URGENT"],{message:"Priority must be one of LOW, MEDIUM, HIGH, URGENT"}),
})