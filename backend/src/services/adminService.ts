import { Role } from "../../generated/prisma/client.js";
import { ticketRepository } from "../repository/ticketRepository.js";
import { userRepository } from "../repository/userRepository.js";


export const listUsers = (role?: Role) => userRepository.findMany(role);

export const setUserActive = async (
  targetId: number,
  adminId: number,
  isActive: boolean,
) => {
  if (targetId === adminId) {
    throw new Error("You cannot change your own active status");
  }

  const user = await userRepository.findById(targetId);
  if (!user) {
    throw new Error("User not found");
  }

  return userRepository.setActive(targetId, isActive);
};

export const assignTicket = async (ticketId: number, agentId: number) => {
  const ticket = await ticketRepository.findOne({ id: ticketId });
  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (ticket.status === "CLOSED") {
    throw new Error("Cannot assign a closed ticket");
  }

  const agent = await userRepository.findById(agentId);
  if (!agent || agent.role !== "AGENT" || !agent.isActive) {
    throw new Error("Agent not found or inactive");
  }

  if(ticket.assignedToId === agentId){
    throw new Error("ticket is already asssigned to this agent")
  }

  return ticketRepository.assign(ticketId, agentId);
};