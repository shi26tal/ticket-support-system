import jwt  from "jsonwebtoken"

export type JWTPayload ={
    userId: number,
    username:string
    role: "CUSTOMER" | "ADMIN" | "AGENT"
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