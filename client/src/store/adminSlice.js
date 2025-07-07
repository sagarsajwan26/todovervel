import { createSlice } from '@reduxjs/toolkit'
import { adminLogin, deleteTask, getTasks, getUsers } from './adminThunk'

const initialState = {
  isLoggedIn: false,
  adminData: null,
  users: [],
  selectedUser: {},
  taskList:[]
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(adminLogin.pending, (state, action) => {
      state.isLoggedIn = false
      state.adminData = null
    })
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.adminData = action.payload.admin
      localStorage.setItem('token', action.payload.token)
    })
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isLoggedIn = false
    })

    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoggedIn = false
      state.adminData = null
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoggedIn = false
    })
     builder.addCase(getTasks.pending, (state, action) => {
    state.tasks= []
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
        console.log();
        
      state.taskList = action.payload
    })
    builder.addCase(getTasks.rejected, (state, action) => {
     state.taskList=[]
    })

builder.addCase(deleteTask.fulfilled,(state,action)=>{
  console.log(action.payload);
  
  state.taskList= state.taskList.filter(task=> task._id!==action.payload)
})

  }
})
export const {} = adminSlice.actions
export default adminSlice.reducer
