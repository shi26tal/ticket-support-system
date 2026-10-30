import { prisma } from "../config/db.js";

export const categoryRepository = {
  findAll: (onlyActive: boolean) =>
    prisma.ticketCategory.findMany({
      where: onlyActive ? { isActive: true } : {},
      orderBy: { name: "asc" },
    }),

  findById: (id: number) => prisma.ticketCategory.findUnique({ where: { id } }),

  findByName: (name: string) =>
    prisma.ticketCategory.findUnique({ where: { name } }),

  create: (name: string) => prisma.ticketCategory.create({ data: { name } }),

  update: (id: number, data: { name?: string; isActive?: boolean }) =>
    prisma.ticketCategory.update({ where: { id }, data }),
};
