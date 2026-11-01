import { Role } from "../../generated/prisma/enums.js";
import { prisma } from "../config/db.js";

export const userRepository = {
  findByUsername: async (username: string) => {
    return await prisma.user.findUnique({
      where: { username },
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  createUser: async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    role?: Role;
  }) => {
    return await prisma.user.create({ data });
  },

  getUsers: async () => {
    return await prisma.user.findMany();
  },

  findLeastBusyAgent: async () => {

    // fetch all active agent
    const agents = await prisma.user.findMany({
      where: { role: "AGENT", isActive: true },

      // select the agent id and count their assigned tickets
      select: {
        id: true,
        _count: {
          select: {
            assigned: { where: { status: { in: ["OPEN", "IN_PROGRESS"] } } },
          },
        },
      },
      // sort agents by id
      orderBy: { id: "asc" },
    });

    if (agents.length === 0) return null;

    // reduce keeps the first (lowest id) agent on ties
    return agents.reduce((best, a) =>
      a._count.assigned < best._count.assigned ? a : best,
    );
  },
};
