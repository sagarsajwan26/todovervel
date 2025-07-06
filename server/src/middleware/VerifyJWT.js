import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'

export const verifyJWT= (req,res,next)=>{
  console.log(req.cookies);
  
    
    const accessToken = req.cookies.accessToken 
    
    
    if(!accessToken) throw new ApiError(400,"access token is missing")
    try {
        const user= jwt.verify(accessToken,process.env.JSON_WEB_TOKEN_SECRET)
  
        
        req.user= user

        next()
    
   } catch (error) {
    console.log(error);
    
   }
    
}