import { prisma } from "../config/db.js";
import {
  Prisma,
  TicketPriority,
  TicketStatus,
} from "../../generated/prisma/client.js";

const ticketInclude = {
  category: { select: { id: true, name: true } },
  customer: { select: { id: true, name: true, username: true } },
  assignedTo: { select: { id: true, name: true, username: true } },
};

export const ticketRepository = {
  create: (data: {
    subject: string;
    description: string;
    categoryId: number;
    customerId: number;
    priority?: TicketPriority;
    assignedToId?: number | null;
  }) =>
    prisma.ticket.create({
      data,
      include: ticketInclude,
    }),

  findMany: (where: Prisma.TicketWhereInput, skip: number, take: number) =>
    prisma.$transaction([
      prisma.ticket.findMany({
        where,
        include: ticketInclude,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.ticket.count({ where }),
    ]),

  findOne: (where: Prisma.TicketWhereInput) =>
    prisma.ticket.findFirst({ where, include: ticketInclude }),

  updateStatus: (id: number, status: TicketStatus) => {
    return prisma.ticket.update({
      where: { id },
      data: {
        status,
        ...(status === "RESOLVED" && { resolvedAt: new Date() }),
        ...(status === "CLOSED" && { closedAt: new Date() }),
      },
      include: ticketInclude,
    });
  },

  assign: (id: number, assignedToId: number) => {
    return prisma.ticket.update({
      where: { id },
      data: { assignedToId },
      include: ticketInclude,
    });
  },
};

// include fetches related records
// select chooses which fields to return

// findMany: (where: conditions for filtering tickets, skip: no. of records to skip ,take: no. of records to fetch) =>

// where = { status: "OPEN" } , skip = 0 , take = 10
// This means fetch the first 10 OPEN tickets.

// prisma.$transaction([]) - executing 2 database operation together
