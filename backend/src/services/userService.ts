import { userRepository } from "../repository/userRepository.js"


export const getUsersService = async ()=> {

    const users = await userRepository.getUsers()

    return users
}