import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaPlusCircle, FaCog, FaSignOutAlt,FaClipboardList } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]); // ✅ Initialized as array because we're using .length
  const [filterData, setFilterData] = useState(null); // ✅ For storing the matched employee data
  const emp_id = localStorage.getItem("Emp_Id"); // ✅ Fetching Emp_Id from localStorage

  // ✅ Fetch all registered users on component mount
  const fetchData = async () => {
    try {
      const Register_response = await fetch(`${import.meta.env.VITE_DB_RENDER}/employee_register`);
      const Register_Data = await Register_response.json();
      setUser(Register_Data); // ✅ Set user array
    } catch (error) {
      alert('Sorry Data Fetching Faild \n Try Again Later')
    }
  };

  useEffect(() => {
    fetchData(); // ✅ Run once on mount
  }, []);

  useEffect(() => {
    // ✅ Run when user data is loaded
    if (user.length > 0) {
      const foundData = user.find(u => u.Emp_Id === emp_id); // ✅ Match current employee
      setFilterData(foundData);

      // ✅ Store the employee's company name in localStorage (if found)
      if (foundData?.company) {
        localStorage.setItem("company_name", foundData.company); // ✅ Store company_name
      }
    }
  }, [user]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // ✅ Redirect to login page
  };
    return (
    <div
      className="container-fluid"
      style={{
        background: 'radial-gradient(circle, rgba(174, 220, 238, 1) 0%, rgba(148, 187, 233, 1) 100%)',
        minHeight: '100vh',
        padding: '2rem 0',
      }}
    >
      <div
        className="container p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(9, 9, 121, 0.95) 0%, rgba(0, 212, 255, 0.95) 100%)',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        <div className="row align-items-center" style={{ minHeight: '80vh' }}>
          {/* Sidebar */}
          <div className="col-12 col-md-4 col-lg-3 mb-4">
            <div
              className="card text-center border-0 mt-5"
              style={{
                padding: '2rem 1rem',
                borderRadius: '20px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                
              }}
            >
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9us0MxB35Wv3z03TJFrxhub-WyxqpBKAsjQ&s"
                alt="employee"
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  margin: '0 auto',
                  border: '4px solid #0dcaf0',
                  cursor:'pointer'
                  
                }}
                onClick={()=>navigate('profile')}
                />
                {filterData ?
              (<h5 className="mt-3 text-primary fw-bold">{filterData.First_Name}</h5>  ):(<p>Loading...</p>)
              }
              
              <div className="d-grid gap-3 mt-4">
               
               <button className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"onClick={()=>navigate('posted_jobs')}>
                  <FaBriefcase />
                   Posted Jobs
                </button>
               
                
                <button className="btn btn-outline-success d-flex align-items-center justify-content-center gap-2"onClick={()=>navigate('create_jobs')}>
                  <FaPlusCircle /> 
                  Create Job
                </button>
                <button className="btn btn-outline-info d-flex align-items-center justify-content-center gap-2"onClick={()=>navigate('review_application')}>
                  <FaClipboardList/>
                  Review Applications
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"onClick={()=>navigate('profile')}>
                  <FaCog /> 
                  Settings
                </button>
                <button className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2" 
                onClick={handleLogout}
                >
                  <FaSignOutAlt/> 
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <Outlet/> 
          {/* Outlet is used for render the nested components in same page */}
        </div>
      </div>
    </div>

  );
};

export default Employee;

