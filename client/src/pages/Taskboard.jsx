import React, { useEffect } from 'react'
import TaskboardSidebar from '../components/TaskboardSidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getTasks, getUsers } from '../store/adminThunk'

function Taskboard() {
 const dispatch= useDispatch()
  useEffect(()=>{
      dispatch(getUsers())
  },[])

  useEffect(()=>{
    dispatch(getTasks())

  },[])
  return (
    <div className='main-taskboard'  >
            <TaskboardSidebar/>
            <Outlet/>



    </div>
  )
}

export default Taskboard