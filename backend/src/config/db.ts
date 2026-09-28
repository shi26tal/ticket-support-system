import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js"; 
import { PrismaPg } from "@prisma/adapter-pg";

// its newer version of prisma bhayeko ley yesma ni dotenv/config import chaixa

// PrismaClient library is going to help us have auto completion and type definition for all of our tables.
//  so when we define in neon db table and create each tables , they are gonna have columns and types , it would be good to have auto completion and recognition of what those columns and tables are inside of our project. you will see that beacuse of Prisna Client

// yoh developemnt ho ki production bhanera suru mai chutainu parxa cause tesley garda hami ley kaam ni differently garnu parxa

// npm install @prisma/adapter-pg pg
// for newer prisma version we need adapter to connect to db

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// make function that connect db  and disconnect

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via prisma");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`db connection error: ${message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };

// to create table : we can do manually in schema
