import 'dotenv/config'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import { connectDB } from '../src/db/mongodb.js'
import adminRouter from '../src/routes/admin.router.js'

import serverless from 'serverless-http'
const app= express() 


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['POST', 'PATCH', 'PUT', 'DELETE'],
}));


app.use('/api/v1/admin',adminRouter)



connectDB()

export default app 
export const handler= serverless(app)