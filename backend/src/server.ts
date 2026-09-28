import express, { Request, Response } from "express"
import { config } from "dotenv"

import authRouter from './routes/authRoutes.js'

config()
const app = express()

app.use(express.json())

app.get('/',(req : Request,res : Response)=> {
    res.json({message: 'spport ticket api is running'})
})


app.use('/auth',authRouter)



const PORT = 5002

app.listen(PORT, ()=> {
    console.log(`server is running in : ${PORT}`)
})