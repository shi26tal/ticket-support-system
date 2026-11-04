import {z} from "zod"

export const createTicketSchema = z.object({
    subject:z.string().trim().min(3,"Subject must be at least 3 characters").max(150),
    description: z.string().trim().min(10,"Description must be at least 10 characters").max(250),
    categoryId: z.number().int().positive(),
    priority: z.enum(["LOW","MEDIUM","HIGH","URGENT"],{message:"Priority must be one of LOW, MEDIUM, HIGH, URGENT"}),
})

export const listTicketsQuerySchema = z.object({
    status: z.enum(["OPEN","IN_PROGRESS","RESOLVED","CLOSED"],{message:"Status must be one of OPEN, IN_PROGRESS, RESOLVED, CLOSED"}).optional(),
    // z.coerce converts the input into required data type before performing validation
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10)
})

export const updateStatusSchema = z.object({
    status: z.enum(["IN_PROGRESS","RESOLVED","CLOSED"])
})

export const createMessageSchema = z.object({
    message: z.string().trim().min(1,"message cannot be empty").max(2000),
})