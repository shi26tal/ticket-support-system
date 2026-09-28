import { prisma } from "../config/db.js"


export const userRepository = {
    findByUserName: async (username: string) => {
    return await prisma.user.findUnique({
        where: {username}
    })
  },

  createUser : async (data : {name:string,username:string,email:string,password:string}) => {
    return await prisma.user.create({data})
  }
}