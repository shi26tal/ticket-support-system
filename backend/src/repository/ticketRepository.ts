import { prisma } from "../config/db.js";
import { TicketPriority } from "../../generated/prisma/enums.js";

export const ticketRepository = {
  create: (data: {
    subject: string;
    description: string;
    categoryId: number;
    customerId: number;
    priority?: TicketPriority;
  }) =>
    prisma.ticket.create({
      data,
      include: { category: { select: { id: true, name: true } } },
    }),
};
