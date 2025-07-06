import { response } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";

const generateToken = async(id)=>{
    if(!id) throw new ApiError(401,"no  user id found")
        try {
            const user = await User.findById(id)
            if(!user) throw new Error(401,'sorry you are not authorize');
       
            
            const accessToken= await user.generateAccessToken()
            return accessToken
            
            
        } catch (error) {
            console.log(error);
            
        }

}

export const userLogin = AsyncHandler(async(req,res)=>{

    
    const {email,password}= req.body
    if(!email.trim() || !password.trim()) throw new ApiError(401,"fields are required")
        const user= await User.findOne({email} )
    if(!user) throw new ApiError(401,"user not found")
        const verifypassword= await user.isPasswordCorrect(password)
    if(!verifypassword) throw new ApiError(401,"invalid credentials" )

        const accessToken= await generateToken(user._id) 
        
        if(!accessToken) throw new ApiError(401,"internal server error")
            console.log(accessToken);
            
            return res.status(200).cookie('accessToken',accessToken).json(new ApiResponse(401, {user},"login successfull"))
        
})


export const userTask= AsyncHandler(async(req,res)=>{
    console.log(req.user);
    
    const loginUser=  req.user.id 
    const user  = await User.findById(loginUser) 
    if(!user)  throw new ApiError(401,"you are not authorize")

        const tasks= await Task.find({
            $or:[{assignedTo:user._id}]
        })
        return res.status(200).json(new ApiResponse(200,{tasks},'tasks fetched'))

})