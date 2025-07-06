import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage'
import Taskboard from './pages/Taskboard'
import ProtectedRoute from './pages/ProtectedRoute'
import TaskboardMain from './components/TaskboardMain'
import AssignTask from './components/AssignTask'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/signup' element={<Signup/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/taskboard' element={<Taskboard/>} >
          <Route path='' element={<TaskboardMain/>}></Route>
          <Route path='assign' element={<AssignTask/>}></Route>
      </Route>

      </Route>
    </Routes>

    </BrowserRouter>
  )
}

export default App