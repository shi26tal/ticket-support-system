// rules

import { Role, TicketStatus } from "../../generated/prisma/client.js";

export const allowedTransitions: Record<
  Role,
  Partial<Record<TicketStatus, TicketStatus[]>>
> = {
  CUSTOMER: {
    OPEN: ["CLOSED"],
    IN_PROGRESS: ["CLOSED"],
    RESOLVED: ["CLOSED"],
  },
  AGENT: {
    OPEN: ["IN_PROGRESS"],
    IN_PROGRESS: ["RESOLVED"],
  },
  ADMIN: {
    OPEN: ["IN_PROGRESS", "CLOSED"],
    IN_PROGRESS: ["RESOLVED", "CLOSED"],
    RESOLVED: ["CLOSED"],
  },
};
