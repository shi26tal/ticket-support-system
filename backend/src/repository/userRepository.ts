import { Role } from "../../generated/prisma/enums.js"
import { prisma } from "../config/db.js"


export const userRepository = {
    findByUsername: async (username: string) => {
    return await prisma.user.findUnique({
        where: {username}
    })
  },

  findByEmail : async (email: string) => {
    return await prisma.user.findUnique({
        where: {email}
    })
  },

  createUser : async (data : {name:string,username:string,email:string,password:string, role?:Role}) => {
    return await prisma.user.create({data})
  },

  getUsers : async () => {
    return await prisma.user.findMany()
  }
}