import { TicketPriority } from "../../generated/prisma/enums.js";
import { categoryRepository } from "../repository/categoryRepository.js";
import { ticketRepository } from "../repository/ticketRepository.js";


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

  return ticketRepository.create({ ...data, customerId });
};