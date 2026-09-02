import {z} from 'zod'

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6,"Password must be at least 6 characters")
})

export const loginSchema = z.object({
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6,"Password must be at least 6 characters")
})