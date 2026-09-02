import express from "express"
import { config } from "dotenv"

import userRouter from './routes/userRoutes.js'

config()
const app = express()

app.use(express.json())

app.get('/',(req,res)=> {
    res.json({message: 'spport ticket api is running'})
})


app.use('/user',userRouter)



const PORT = 5002

app.listen(PORT, ()=> {
    console.log(`server is running in : ${PORT}`)
})