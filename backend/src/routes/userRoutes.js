import express from 'express'
import { login, registerUser } from '../controllers/userController.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { loginSchema, registerSchema } from '../validations/userValidation.js'

const router = express.Router()

// router.get('/hello',(req,res)=> {
//     res.json({message: "hello"})
// })

router.post("/register",validateRequest(registerSchema),registerUser)
router.post("/login",validateRequest(loginSchema),login)

export default router
