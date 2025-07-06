import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse} from '../utils/ApiResponse.js'
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const generateToken = async(id)=>{
    if(!id) throw new ApiError(401,"no  user id found")
        try {
            const admin = await Admin.findById(id)
            if(!admin) throw new Error(401,'sorry you are not authorize');
       
            
            const accessToken= await admin.generateAccessToken()
            return accessToken
            
            
        } catch (error) {
            console.log(error);
            
        }

}


export const createAdmin=AsyncHandler(async(req,res)=>{
    const {name , email , username, password} = req.body
    if(!email.trim|| !name.trim()|| !username.trim()|| !password.trim) throw new ApiError(400,'fields cannot be empty')
       
        
        const  checkIfUser= await Admin.find({$or:[{username},{email}]})
        
        
        if(!checkIfUser) throw new ApiError(401,'already an user')
            const newAdmin = await Admin.create({
        name ,
        username,
        email,
        password

    })
    // console.log(newAdmin);
    
    if(!newAdmin) throw new ApiError(401,"internal server error")

    return res.status(200).json( new ApiResponse(201,{newAdmin},'succesfuly created data'))

})


//handle create user again 

export const createUser = AsyncHandler(async (req, res) => {
    const loginAdmin= req.user.id
    console.log(loginAdmin);
    
    if(!loginAdmin) throw new ApiError(401,'you must login first')
        const admin = await Admin.findById(loginAdmin)
    if(!admin ) throw new ApiError(401,'you are not authorize')
    const { username, email, password } = req.body;
    if (!email?.trim() || !username?.trim() || !password?.trim()) {
        throw new ApiError(400, 'fields cannot be empty');
    }


    const checkIfUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkIfUser) throw new ApiError(401, 'already a user');

    const newUser = await User.create({
        username,
        email,
        password
    });

    if (!newUser) throw new ApiError(500, "internal server error");

    return res.status(201).json(new ApiResponse(201, { newUser }, 'successfully created user'));
});
export const loginAdmin = AsyncHandler(async (req, res) => {
    
    // console.log(req.body);
    
    const { username, password } = req.body;
    if (!username?.trim() || !password?.trim()) {
        throw new ApiError(400, 'fields cannot be empty');
    }

    const admin = await Admin.findOne({ username });
    if (!admin) throw new ApiError(401, 'admin not found');

   
    const isPasswordValid = await admin.isPasswordCorrect(password)
    if (!isPasswordValid) throw new ApiError(401, 'invalid credentials');
const token = await generateToken(admin._id)
if(!token) throw new ApiError(401,'internal server error')

    return res.status(200).cookie('accessToken',token).json(new ApiResponse(200, { admin }, 'login successful'));
});


export const assignTask= AsyncHandler(async(req,res)=>{
    const loginAdmin = req.user.id 
    const admin = await Admin.findById(loginAdmin)
    if(!admin) throw new ApiError(401,"you are not authorize")

    const {title, description, priority,assignedTo} = req.body
    const user= await User.findById(assignedTo)
    if(!user) throw new ApiError(401,"user does not exits")
        const newTask= await Task.create({
            title,
            description,
            priority,
            assignedBy:loginAdmin,
            assignedTo
    })
    user.tasks.push(newTask._id) 
    await user.save()

    if(!newTask) throw new ApiError(401,"internal server error")
        return res.status(200).json(new ApiResponse(201,{newTask},"task successfully assigned"))
})

export const deleteTask=AsyncHandler(async(req,res)=>{
    const {taskId}  = req.params 
    if(!taskId ) throw new ApiError(401,"choose a proper task") 
        const FindTask= await Task.findById(taskId).populate('assignedTo','username email ') 
  
    const user= await User.findById(FindTask.assignedTo._id)
    // console.log(user);
    if(!user) throw new ApiError(401,"user not found")
        user.tasks.pull(taskId)

    const deleteTask = await Task.findByIdAndDelete(taskId)
    await user.save({validateBeforeSave:false})
    
    return res.status(200).json(new ApiResponse(201,{message:"successfully deleted task"}))
     
})


export const updateTask= AsyncHandler(async(req,res)=>{
    const {taskId} = req.params
    const {title,description, status, priority} = req.body
    const loginAdmin =req.user.id 
    const admin =  await Admin.findById(loginAdmin) 
    if(!admin ) throw new ApiError(401,"you are not authorize")

    if(!taskId) throw new ApiError(401,"select a valid task")
        const task = await Task.findByIdAndUpdate(taskId,{
    title,
    description,
    status,
    priority
    },{new:true})

    return res.status(200).json(new ApiResponse(200,{task},'successfully updated task'))
})

export const getUser= AsyncHandler(async(req,res)=>{
       const loginAdmin =req.user.id 
    const admin =  await Admin.findById(loginAdmin) 
    if(!admin ) throw new ApiError(401,"you are not authorize")
        
        const users= await User.find()

        return res.status(200).json(new ApiResponse(200,{users},"users fetched successfully"))


})

export const getAdminTasks= AsyncHandler(async(req,res)=>{
        const loginAdmin =req.user.id 
    const admin =  await Admin.findById(loginAdmin) 
    if(!admin ) throw new ApiError(401,"you are not authorize")
        const tasks= await Task.find().populate("assignedTo","username email")
        return res.status(200).json(new ApiResponse(200,{tasks},"tasks fetched successfully"))
})


export const getTaskForEdit=AsyncHandler(async(req,res)=>{
    console.log('bid');
    
    const {taskId}= req.params
    const task = await Task.findById(taskId)
    if(!taskId) throw new ApiError(401,'no task found')
        return res.status(200).json(new ApiResponse(200,{task},'task found'))
    })

