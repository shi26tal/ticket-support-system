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


// customer can close their ticket, whether the ticket is open,being worked on or resolved.

// agent handle the actual support work 
// agent cannot close the ticket
// An agent starts working on a new ticket, changing it from OPEN to IN_PROGRESS. After fixing the issue, they change it to RESOLVED.
// Current status	    Allowed change
// OPEN	                  IN_PROGRESS
// IN_PROGRESS	            RESOLVED

// An admin can close an unwanted ticket directly without moving it to IN_PROGRESS first. 

