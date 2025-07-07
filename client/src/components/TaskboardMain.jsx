import React, { use, useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios'
import TaskboardSidebar from './TaskboardSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../store/adminThunk'
import { useNavigate } from 'react-router-dom'

function TaskboardMain() {
const tasks= useSelector(state=> state.adminSlice.taskList)

const [task,setTask] = useState([])
const navigate= useNavigate()
const [selectedPriority,setSelectedPriority] = useState('')
const handleEditTask=(item)=>{
    navigate('/taskboard/assign',{state:{item}})
}
const dispatch= useDispatch()
const handleDeleteTask=((id)=>{
    dispatch(deleteTask(id))
})

console.log(tasks);
useEffect(()=>{
  setTask(tasks)
},[tasks])

const priorityOrder={
  "low":1,
  "medium":2,
  "high":3
}

const sortTask= [...task].sort((a,b)=>{
  if(!selectedPriority) return 0

 if(a.priority === selectedPriority&& b.priority !==selectedPriority) return -1 
 if(b.priority === selectedPriority&& a.priority !==selectedPriority) return 1 
return 0
})

  return task.length!==0 &&  (
    <div className='tasklist' >
        <h1>
          task List
        </h1>
            <select value={selectedPriority} onChange={e=>setSelectedPriority(e.target.value)}>

    
              <option value="">All</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
  
            </select>
        <div className='taskList-items' >
           {
            sortTask?.map(item=>(
              <div className='taskList-single-item' key={task._id}>
                <div >
                  <p className='taskList-single-item_heading' >{item.title}</p>
                  <p className='taskList-single-item_description'>{item.description}</p>
                </div>
                <div>
                  <p className='taskList-single-item_heading' >
                    {item.status}
                  </p>
                  <p className='taskList-single-item_description'>{item.priority}</p>
                </div>
                <div className='btn-box' >
                  <button className='btnEdit' 
                  onClick={()=>handleEditTask(item)}
                  
                  >Edit</button>
                  <button className='btnDelete'
                  onClick={()=>handleDeleteTask(item._id)}
                  >Delete</button>
                </div>
              </div>
            ))
           }
        </div>

    </div>
  )
}

export default TaskboardMain