import { prisma } from "../config/db.js";

export const messageRepository = {
  create: (ticketId: number, userId: number, message: string) => {
    return prisma.ticketMessage.create({
      data: { ticketId, userId, message },
      include: {
        user: { select: { id: true, name: true, username: true, role: true } },
      },
    });
  },
  findByTicket: (ticketId: number) => {
    return prisma.ticketMessage.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" },
      include: {
        user: { select: { id: true, name: true, username: true, role: true } },
      },
    });
  },
};
