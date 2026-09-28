import {z} from 'zod'

export const registerSchema = z.object({
    name: z.string(),
    username:z.string().min(3),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6,"Password must be at least 6 characters")
})

export const loginSchema = z.object({
    username:z.string().min(3,"PLease provide the username"),
    password: z.string().min(6,"Password must be at least 6 characters")
})