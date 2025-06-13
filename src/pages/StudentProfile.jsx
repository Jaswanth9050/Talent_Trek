import React, { useEffect, useState } from 'react';
import Job_Applied from '../components/Job_Applied';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const StudentProfile = () => {
  const studentid = localStorage.getItem('user_id');
  const [application, setApplication] = useState(null); // Original data
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({}); // For editing
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/student_register?id=${studentid}`);
      const data = await res.json();
      if (data.length > 0) {
        setApplication(data[0]);
        setFormData(data[0]); // Fill form for editing
      } else {
        setApplication(null);
      }
    } catch (err) {
      alert('Error Fetching Student Data')
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/student_register/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setApplication(updated);
        setEditMode(false);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert("Error in Updating Profile \n Try Again Later")
    }
    localStorage.setItem("user",formData.name)
  };


  const handleCancel = () => {
    setFormData(application); // Reset form to original data
    setEditMode(false);
  };

  return (
    <>
      <NavBar />

      <div className="container py-5">
        {application ? (
          <>
            <div className="card shadow-lg rounded-4 p-4 mt-5 border-0 bg-light">
              <div className="row align-items-center">
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Student Avatar"
                    className="rounded-circle shadow"
                    width="150"
                    height="150"
                  />
                  <h5 className="mt-3 text-primary">{application.name}</h5>
                  <span className="badge bg-success mt-2">Active Student</span>
                </div>

                <div className="col-md-8">
                  <h3 className="mb-4 text-center text-md-start">Student Profile Details</h3>

                  {editMode ? (
                    <div>
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleEditChange}
                          disabled
                        />
                      </div>
                      {/* Add more fields as needed here */}

                      <div className="d-flex gap-3 mt-3">
                        <button className="btn btn-success" onClick={handleSave}>
                          Save
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-transparent">
                        <strong>Student ID:</strong> {studentid}
                      </li>
                      <li className="list-group-item bg-transparent">
                        <strong>Full Name:</strong> {application.name}
                      </li>
                      <li className="list-group-item bg-transparent">
                        <strong>Email:</strong> {application.email}
                      </li>
                    </ul>
                  )}

                  {!editMode && (
                    <div className="mt-4 d-flex justify-content-center justify-content-md-start gap-3">
                      <button className="btn btn-outline-primary" onClick={() => setEditMode(true)}>
                        Edit Profile
                      </button>
                      <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Job_Applied />
            </div>
          </>
        ) : (
          <div className="alert alert-warning text-center mt-5">
            Student profile not found or not registered.
          </div>
        )}
      </div>
    </>
  );
};

export default StudentProfile;
