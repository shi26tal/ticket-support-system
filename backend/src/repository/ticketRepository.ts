import { prisma } from "../config/db.js";
import { Prisma } from "../../generated/prisma/client.js";
import { TicketPriority } from "../../generated/prisma/enums.js";

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
  }) =>
    prisma.ticket.create({
      data,
      include: { category: { select: { id: true, name: true } } },
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
};

// include fetches related records
// select chooses which fields to return

// findMany: (where: conditions for filtering tickets, skip: no. of records to skip ,take: no. of records to fetch) =>

// where = { status: "OPEN" } , skip = 0 , take = 10
// This means fetch the first 10 OPEN tickets.

// prisma.$transaction([]) - executing 2 database operation together
