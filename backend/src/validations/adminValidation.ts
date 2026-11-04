import {z} from "zod"

export const setActiveSchema = z.object({
    isActive : z.boolean()
})

export const assignTicketSchema = z.object({
  agentId: z.number().int().positive(),
});

export const listUsersQuerySchema = z.object({
  role: z.enum(["CUSTOMER", "AGENT", "ADMIN"]).optional(),
});