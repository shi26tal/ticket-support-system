import { config } from "dotenv";
import bcrypt from "bcrypt";
import { prisma } from "../src/config/db.js";

config();

async function main() {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

//   upsert method is used to either update an existing record or create a new one if it doesn't exist. In this case, it checks for a user with the username "admin". If such a user exists, it does nothing (update: {}). If it doesn't exist, it creates a new user with the specified details (name, username, email, password, role).
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      name: "Admin",
      username: "admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    },
  });
}

main().finally(()=> prisma.$disconnect());