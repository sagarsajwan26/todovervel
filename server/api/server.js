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

app.use(cors({
  origin:["https://todovervel-b9ic.vercel.app","http://localhost:5173"]
  credentials: true,
  methods: ['POST', 'PATCH', 'PUT', 'DELETE'],
}));



app.use('/api/v1/admin',adminRouter)



connectDB()

export default app 
export const handler= serverless(app)
