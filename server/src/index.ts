import express from 'express'
import { connectDB } from './dataBase/DBConnection.ts'
import dotenv from 'dotenv'
import type { Request, Response } from 'express'
import { errorHandler } from './middlewares/error.middleware.ts'
import cors from 'cors'
export const app = express()


import { router as userRouter } from './routes/user.routes.ts'
import cookieParser from 'cookie-parser'

dotenv.config({
    path : './.env'
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_BASE_URL
}))
app.use(cookieParser())
connectDB()

app.use('/api/v1/users', userRouter);


app.use(errorHandler)

