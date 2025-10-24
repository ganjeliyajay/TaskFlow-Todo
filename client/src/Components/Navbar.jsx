import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Auth/Login'
import SignupPage from './Auth/SignUp'
import Dashboard from '../Pages/Dashboard'
import TaskList from './Task/TaskList'
import UpdateTask from './Task/UpdateTask'
import Profile from '../Pages/Profile'
import AddTaskForm from './Task/AddTaskForm'
import OtpVerification from './Auth/OtpVerification'

export default function Navbar() {
    return (
        <BrowserRouter>
            <Routes> 
                <Route path='/' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/addtask' element={<AddTaskForm />} />
                <Route path='/task' element={<TaskList />} />
                <Route path='/edit' element={<UpdateTask />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/verification' element={<OtpVerification />} />
            </Routes>
        </BrowserRouter>
    )
}
