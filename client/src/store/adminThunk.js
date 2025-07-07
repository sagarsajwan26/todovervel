import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";


export const createAdmin= createAsyncThunk('/admin/signup',async(data)=>{
    console.log(data);
    
    try {
        const res= await axiosInstance.post('/admin/createAdmin',data)
    } catch (error) {
    console.log(error);
        
    }
})

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
        return res.data.data.users
       
        
    } catch (error) {
        console.log(error);
        
    }
})

export const assignTask= createAsyncThunk('/admin/createTask',async(data)=>{
    const token = localStorage.getItem('token')
  
   
   
    try {
   
            const res = await axiosInstance.post('/admin/assignTask',data,{
                 headers:{
                'Authorization':`Bearer ${token}`
            }
            })
            console.log(res);
            
    } catch (error) {
        console.log(error);
        
    }
})

export const getTasks= createAsyncThunk('/admin/getTasks',async()=>{
    const token = localStorage.getItem('token')    
    try {
            const res= await axiosInstance.get('/admin/getTasks',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            return res?.data?.data?.tasks
          
            

        } catch (error) {
            console.log(error);
            
        }
})


export const deleteTask= createAsyncThunk('/admin/delete',async(id)=>{
    const token = localStorage.getItem('token')
    try {
        const res= await axiosInstance.delete(`/admin/${id}/deleteTask`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
       if(res?.data?.data?.message) return id
        
    } catch (error) {
        console.log(error);
        
    }
})


export const editTask= createAsyncThunk( '/admin/edit',  async({id,data})=>{
    const token= localStorage.getItem('token')
    console.log(id,data);
    
    try {
        const res= await axiosInstance.patch(`/admin/${id}/updateTask`,data,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        console.log(res);
        
    } catch (error) {
        console.log(error);
        
    }

})


export const logoutAdmin = createAsyncThunk('/admin/logout',async()=>{
const token = localStorage.getItem('token')
    try {
        const res= await axiosInstance.get('/admin/logout',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.log(error);
        
    }
})