import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { z } from "zod";
import { generateToken } from "../utils/generateToken.js";
import { userRepository } from "../repository/userRepository.js";
import { Role } from "../../generated/prisma/enums.js";

// type definition
// extract the inferred type
type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

// register - logic
export const createAccount = async (data : RegisterData,role:Role) => {
  // check if email already exist
  
  const existingUser = await userRepository.findByUsername(data.username)

  if (existingUser) {
    throw new Error("user with this username already exists");
  }

  const existingEmail = await userRepository.findByEmail(data.email)

  if(existingEmail){
    throw new Error("user with this email already exists")
  }


  // hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // create user
  const user = await userRepository.createUser({
   ...data,password: hashedPassword, role
  })

  // yeta bata user aayo

  // dont return password
  return {
    id: user.id,
    name: user.name,
    username:user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

// one createAccount function can be used to create both customer and agent accounts, so we can create two separate functions for that

export const createUser = (data: RegisterData) => createAccount(data, "CUSTOMER");
export const createAgent = (data: RegisterData) => createAccount(data, "AGENT");


// login
export const loginUser = async ({ username, password }: LoginData) => {
  // find user by username
  const user = await userRepository.findByUsername(username)

  if (!user) {
    throw new Error("invalid username or password");
  }

  if(!user.isActive){
    throw new Error("Account is deactivated")
  }

  // compare  entered password with hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("invalid username or password");
  }

  const token = await generateToken({
    userId: user.id,
    username: user.username,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username:user.username,
      email: user.email,
      role: user.role,
    },
  };
};
