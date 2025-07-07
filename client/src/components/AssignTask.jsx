import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignTask, editTask, getTasks } from '../store/adminThunk'
import { useLocation, useNavigate } from 'react-router-dom'

function AssignTask() {
    const users= useSelector(state=> state.adminSlice.users)
    const location= useLocation()
    const [loading, setLoading ]= useState(false)
   
    
    const DataToEdit= location?.state?.item

const navigate= useNavigate()
   
    
    const [task,setTask] = useState({
    title:'',
    description:'',
    priority:"",
    assignedTo:"",
    status:'',
 })
 const dispatch= useDispatch()
    const handleFormOnChange=(e)=>{
        setTask({...task,
            [e.target.name]:e.target.value
        })
    }

useEffect(()=>{
    setTask({
           title: DataToEdit?.title? DataToEdit.title : "",
    description:  DataToEdit?.description? DataToEdit.description:'',
    priority: DataToEdit?.priority? DataToEdit.priority:  "",
   assignedTo:DataToEdit?.assignedTo?DataToEdit.assignedTo._id :"",
   status:DataToEdit?.status?DataToEdit.status :'',
    
    })
},[])

    const handleOnSubmit=async (e)=>{
        e.preventDefault()
       try {
         setLoading(true)
         if(DataToEdit){
             await dispatch(editTask({id:DataToEdit._id, data:task}))
             
         }
         else {
                 await dispatch(assignTask(task))
         }
             await dispatch(getTasks())
               navigate('/taskboard')
       } catch (error) {
        console.log(error);
        
       } finally{
        setLoading(false)
       }
    }
    
    console.log(task);
    
  return  (
    <div className="assignTask-container">
      <h1 className="assignTask-title">Assign Task</h1>

      <form className="assignTask-form">
        <input
          className="assignTask-input"
          type="text"
          name="title"
          value={task.title}
          onChange={handleFormOnChange}
          placeholder="Title"
        />

        <input
          className="assignTask-input"
          type="text"
          name="description"
          value={task.description}
          onChange={handleFormOnChange}
          placeholder="Description"
        />

        <select
          className="assignTask-select"
          name="priority"
          value={task.priority}
          onChange={handleFormOnChange}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="assignTask-select"
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleFormOnChange}
        >
          <option value="">Assign to</option>
          {users && users.length !== 0 && users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>

        <select
          className="assignTask-select"
          name="status"
          value={task.status}
          onChange={handleFormOnChange}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
        disabled={loading}
          className="assignTask-button"
          onClick={handleOnSubmit}
        >
          {loading? "assigning task":'asign /update task'}
        </button>
      </form>
    </div>
  )
}

export default AssignTask