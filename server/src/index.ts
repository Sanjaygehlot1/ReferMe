import express from 'express'
import { connectDB } from './dataBase/DBConnection.ts'
import dotenv from 'dotenv'
import type { Request, Response } from 'express'
import { errorHandler } from './middlewares/error.middleware.ts'
export const app = express()

dotenv.config({
    path : './.env'
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()

app.get('/', (req : Request , res: Response) => {
    res.send('Hello World!')
})


app.use(errorHandler)

