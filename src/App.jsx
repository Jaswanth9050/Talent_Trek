import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import JobList from './pages/JobList';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Employee from './pages/Employee';
import Employee_Profile from './components/Employee_Profile';
import Employee_Home from './components/Employee_Home';
import Employee_Create_Jobs from './components/Employee_Create_Jobs';
import Employee_Posted_Jobs from './components/Employee_Posted_Jobs';
import Employee_Login from './pages/Employee_Login';
import Employee_Register_Form from './pages/Employee_Register_Form';
import JobDetails from './pages/JobDetails';
import ErrorPage from './pages/ErrorPage';
import Application from './pages/Application';
import ResetPassword from './pages/ResetPassword';
import Employee_Applications_Data from './components/Employee_Applications_Data';
import Employee_Reset_Details from './pages/Employee_Reset_Details';
import StudentProfile from './pages/StudentProfile';
import { PrivateRouter, EmployeePrivateRouter } from './components/PrivateRouter';


const App = () => {
  // Store logged-in employee here
  const [loggedInUser, setLoggedInUser] = useState(null);
  let navigate=useNavigate()
  const location=useLocation();
  
  // Employee_Login Authertication

  useEffect(()=>{
    let emp_logging_Authentication=localStorage.getItem("isemployerLoggedIN")==='true'; //it is converting the value to boolen
    const publicRoutes=['/','/about','/profile','/contact','/signup','/login','/employee_register','/employee_login','/employee_reset_details'];
    if(emp_logging_Authentication && publicRoutes.includes(location.pathname)){
      navigate('/employee')
    }
  },[location.pathname])
  return (
    <div style={{overflowX:'hidden'}}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="*" element={<ErrorPage />} />

        {/* PrivateRoute */}
      <Route
        path='/jobs'
        element={
          <PrivateRouter>
            <JobList />
          </PrivateRouter>
        }
      />
      <Route
        path='/jobs/:id'
        element={
          <PrivateRouter>
            <JobDetails />
          </PrivateRouter>
        }
      />
      <Route
        path='/jobs/:id/application_from'
        element={
          <PrivateRouter>
            <Application />
          </PrivateRouter>
        }
      />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<StudentProfile />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset_password' element={<ResetPassword />} />

        {/* Employee Register/Login */}
        <Route path='/employee_register' element={<Employee_Register_Form />} />
        <Route path='/employee_reset_details' element={<Employee_Reset_Details />} />
        <Route path='/employee_login' element={
          <Employee_Login setLoggedInUser={setLoggedInUser} />
        }/>

        {/* Employee Dashboard with nested routes */}
        <Route path='/employee' element={
          <EmployeePrivateRouter><Employee user={loggedInUser} /></EmployeePrivateRouter>
        }>
          <Route index element={<Employee_Home />} />
          <Route path='profile' element={<Employee_Profile />} />
          <Route path='create_jobs' element={<Employee_Create_Jobs />} />
          <Route path='posted_jobs' element={<Employee_Posted_Jobs />} />
          <Route path='review_application' element={<Employee_Applications_Data />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
