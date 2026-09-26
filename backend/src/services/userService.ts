import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../../prisma/db.js'
import { loginSchema,registerSchema } from '../validations/userValidation.js'
import {z} from "zod"

// type definition
// extract the inferred type
type RegisterData = z.infer<typeof registerSchema>
type LoginData = z.infer<typeof loginSchema>


// register - logic
export const createUser = async ({name,email,password}:RegisterData) => {

    // check if email already exist
    const existingUser = await db.orm.public.User.where({email}).first()
    
    if(existingUser){
        throw new Error("user with this email already exists")
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // create user
    const user = await db.orm.public.User.create({
        name,email,password : hashedPassword
    })

    // yeta bata user aayo

    // dont return password
    return{
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt : user.createdAt
    }
}

// login
export const loginUser = async ({email,password}:LoginData)=> {

    // find user by email
    const user = await db.orm.public.User.where({email}).first()

    if(!user){
        throw new Error("invalid email or password")
    }

    // compare  entered password with hashed password
    const passwordMatch = await bcrypt.compare(password,user.password)

    if(!passwordMatch){
        throw new Error("invalid email or password")
    }

    const payload = {userId:user.id,role:user.role}

    const secretKey = process.env.JWT_SECRET

    if(!secretKey){
        throw new Error("no secret key found")
    }

    const token = jwt.sign(payload,secretKey,{expiresIn: '1h'})

    return {
        token,
        user: {
            id: user.id,
            name:user.name,
            email: user.email,
            role: user.role
        }
    }
}
