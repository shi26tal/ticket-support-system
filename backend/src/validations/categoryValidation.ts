import {z} from 'zod'

export const createCategorySchema = z.object({
    name : z.string().trim().min(2,"Name must be at least 2 characters"),
})

export const updateCategorySchema = z.object({
    name: z.string().trim().min(2).optional(),
    isActive: z.boolean().optional(),
})
.refine((data) => Object.keys(data).length > 0 , {
    message: "Provide at least one field to update"
})