// import { Role, TicketPriority, TicketStatus } from "../../generated/prisma/enums.js";
import { categoryRepository } from "../repository/categoryRepository.js";
import { ticketRepository } from "../repository/ticketRepository.js";
import {
  Prisma,
  Role,
  TicketPriority,
  TicketStatus,
} from "../../generated/prisma/client.js";
import { userRepository } from "../repository/userRepository.js";
import { allowedTransitions } from "../utils/ticketTransitions.js";

// builds the "who can see what" filter in ONE place
const visibilityFilter = (
  userId: number,
  role: Role,
): Prisma.TicketWhereInput => {
  if (role === "CUSTOMER") return { customerId: userId };
  if (role === "AGENT") return { assignedToId: userId };
  return {}; // ADMIN sees everything
};

export const createTicketService = async (
  customerId: number,
  data: {
    subject: string;
    description: string;
    categoryId: number;
    priority?: TicketPriority;
  },
) => {
  const category = await categoryRepository.findById(data.categoryId);

  if (!category || !category.isActive) {
    throw new Error("Category not found or inactive");
  }

  const agent = await userRepository.findLeastBusyAgent();

  return ticketRepository.create({
    ...data,
    customerId,
    assignedToId: agent?.id ?? null,
  });
};

export const getTickets = async (
  userId: number,
  role: Role,
  query: { status?: TicketStatus; page: number; limit: number },
) => {
  const where: Prisma.TicketWhereInput = {
    ...visibilityFilter(userId, role),
    ...(query.status && { status: query.status }),
  };

  const skip = (query.page - 1) * query.limit;
  const [tickets, total] = await ticketRepository.findMany(
    where,
    skip,
    query.limit,
  );

  return {
    tickets,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
};

export const getTicketById = async (id: number, userId: number, role: Role) => {
  const ticket = await ticketRepository.findOne({
    id,
    ...visibilityFilter(userId, role),
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }
  return ticket;
};

export const changeStatus = async (
  id: number,
  userId: number,
  role: Role,
  newStatus: TicketStatus,
) => {
  const ticket = await ticketRepository.findOne({
    id,
    ...visibilityFilter(userId, role),
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  const allowed = allowedTransitions[role][ticket.status] ?? [];
  //   allowedTransition["AGENT"]["OPEN"]  - > result -> ["IN_PROGRESS"]
  //  "??" nullish coalescing operator
  // means it returns the value in left unless that value is null or undefined otherwise it returns the value on right

  if (!allowed.includes(newStatus)) {
    throw new Error(
      `cannot change status from ${ticket.status} to ${newStatus}`,
    );
  }

  return ticketRepository.updateStatus(id, newStatus);
};
