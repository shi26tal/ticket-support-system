import jwt  from "jsonwebtoken"
import { Role } from "../../generated/prisma/enums.js"

export type JWTPayload ={
    userId: number,
    username:string
    role: Role
}

export const generateToken = ({userId,username,role}:JWTPayload)=> {

    const secretKey = process.env.JWT_SECRET;
    if(!secretKey){
        throw new Error("No secret key found")
    }

    const payload = {
        userId,
        username,
        role
    }

    const token = jwt.sign(payload,secretKey,{expiresIn: '1h'})

    return token
}