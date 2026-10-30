import express, { Request, Response } from "express"
import { config } from "dotenv"

import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'

config()
const app = express()

app.use(express.json())

app.get('/',(req : Request,res : Response)=> {
    res.json({message: 'spport ticket api is running'})
})


app.use('/auth',authRouter)
app.use('/users',userRouter)
app.use("/admin",adminRouter)
app.use("/categories",categoryRouter)



const PORT = 5002

app.listen(PORT, ()=> {
    console.log(`server is running in : ${PORT}`)
})