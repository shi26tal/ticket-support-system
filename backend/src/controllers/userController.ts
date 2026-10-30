import { Request, Response } from "express"
import { getUsersService } from "../services/userService.js"


export const getUsersController = async (req: Request, res: Response) => {

    try {
        const users = await getUsersService()

        return res.status(200).json({
            message: "users fetched successfully",
            users
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }

}