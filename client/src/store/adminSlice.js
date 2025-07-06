import { createSlice } from "@reduxjs/toolkit"
import { adminLogin } from "./adminThunk"

const initialState={
        isLoggedIn:false,
        adminData:null,
        users:[],
        selectedUser:{}
}

const adminSlice= createSlice({
    name:'admin',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
builder.addCase(adminLogin.pending,(state,action)=>{
        state.isLoggedIn= false
        state.adminData= null
})
builder.addCase(adminLogin.fulfilled,(state,action)=>{

    state.adminData= action.payload.admin
    localStorage.setItem('token',action.payload.token)
})
builder.addCase(adminLogin.rejected,(state,action)=>{
state.isLoggedIn= false
})

    }
})
export const {} = adminSlice.actions 
export default adminSlice.reducer