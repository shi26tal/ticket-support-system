import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { z } from "zod";
import { generateToken } from "../utils/generateToken.js";
import { userRepository } from "../repository/userRepository.js";

// type definition
// extract the inferred type
type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

// register - logic
export const createUser = async ({
  name,
  username,
  email,
  password,
}: RegisterData) => {
  // check if email already exist
  
  const existingUser = await userRepository.findByUserName(username)

  if (existingUser) {
    throw new Error("user with this username already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await userRepository.createUser({
    name,username,email,password: hashedPassword
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

// login
export const loginUser = async ({ username, password }: LoginData) => {
  // find user by email
  const user = await userRepository.findByUserName(username)

  if (!user) {
    throw new Error("invalid email or password");
  }

  // compare  entered password with hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("invalid email or password");
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
