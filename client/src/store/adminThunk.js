import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";

export const adminLogin= createAsyncThunk('/admin/login',async(data)=>{
   
    
    try {
        const res= await axiosInstance.post('/admin/loginAdmin',data)
 return res.data.data
        
    } catch (error) {
        console.log(error);
        
    }

})

export const getUsers= createAsyncThunk('/admin/getUsers',async()=>{
    const token = localStorage.getItem('token')
    try {
        const res= await axiosInstance.get('/admin/getusers',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        console.log(res);
        
    } catch (error) {
        console.log(error);
        
    }
})

export const assignTask= createAsyncThunk('/admin/createTask',async()=>{
    try {
        
    } catch (error) {
        console.log(error);
        
    }
})

export const getTasks= createAsyncThunk('/admin/getTasks',async()=>{

})


