import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const loginState = localStorage.getItem("Student_Login") === "true"; // ✅ changed from "user" to "Student_Login"
  return loginState ? children : <Navigate to="/login" replace />;
};

const EmployeePrivateRouter = ({ children }) => {
  const isEmployerLoggedIn = localStorage.getItem("isemployerLoggedIN") === "true";
  return isEmployerLoggedIn ? children : <Navigate to="/employee_login" replace />;
};

// export default PrivateRouter EmployeePrivateRouter;
export { PrivateRouter, EmployeePrivateRouter };

