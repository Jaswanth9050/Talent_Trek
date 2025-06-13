import React, { useEffect, useState } from 'react';
import { getTimeAgo } from '../utility'

const Employee_Posted_Jobs = () => {
  let emp_id = localStorage.getItem("Emp_Id");
  const [jobsData, setJobsData] = useState([]);
  const [emp_posted_jobs, setEmp_posted_jobs] = useState(null);

  const [editingJobId, setEditingJobId] = useState(null); // Track which job is being edited
  const [editFormData, setEditFormData] = useState({});   // Store form input data

  // Fetch all active jobs
  const fetchJobs = async () => {
    try {
      // const response = await fetch('http://localhost:3000/activejobs');
      const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs`);
      const data = await response.json();
      setJobsData(data);
    } catch (error) {
      // console.log("Error in fetching:", error);
      alert("Error In Fetching Jobs \n Try Again Later")
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  // fetch Emp_posted_jobs from activejobs 
  useEffect(() => {
    if (jobsData.length > 0) {
      const filteredJobs = jobsData.filter(job => job.Emp_Id === emp_id); //we are getting emp_id from localstore and Emp_Id from jobData/ by (we decelar job as a varable) in jobs(all jobs) check Emp_Id by(job.Emp_Id) check wheater local and this id is same are not 
      setEmp_posted_jobs(filteredJobs);
    }
  }, [jobsData]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs/${id}`, { method: 'DELETE' });
      setJobsData(prev => prev.filter(job => job.id !== id));
    } catch (error) {
      alert("Error In Fetching Jobs \n Try Again Later")
    }
  };
  const company_name_local=localStorage.getItem("company_name")
  const handleEditClick = (job) => {
    setEditingJobId(job.id);
    setEditFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      experience:job.experience,
      salary: job.salary,
      type: job.type,
      eligibility:job.eligibility,
      rating:job.rating,
      reviews:job.reviews,
      opening:job.opening,
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : '',
      company:company_name_local,
      posted: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Set the current date for the posted field
    const currentDate = new Date().toISOString();

  const handleEditSave = async () => {
    try {
      const updatedJob = {
        ...editFormData,
        posted: currentDate,// getting current time and date
        skills: editFormData.skills.split(',').map(skill => skill.trim()),
        Emp_Id: emp_id

      };
      await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs/${editingJobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob)
      });

      // Update local state and close form
      const updatedJobs = jobsData.map(job =>
        job.id === editingJobId ? { ...job, ...updatedJob } : job
      );
      setJobsData(updatedJobs);
      setEditingJobId(null);
      setEditFormData({});
    } catch (error) {
      alert("Error In Fetching Jobs \n Try Again Later")
    }
  };
  // fetching the company

  const[company,setCompany]=useState(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const storedCompanyName = localStorage.getItem("company_name");
        const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/company?company_name=${storedCompanyName}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.length > 0) {
          setCompany(data[0]); // Set the first matching company
        } else {
          alert("No company data found. \n Try Again Later")
        }
      } catch (error) {
        alert("Company fetching failed. \n Try Again Later")
      }
    };
    fetchCompany(); // Call the async function
  }, []);
  return (
    <div className='col-12 col-md-8 col-lg-9'>
      <h1 className='text-center text-white mb-4'>Posted Jobs</h1>

      {emp_posted_jobs && emp_posted_jobs.length > 0 ? (
        <div style={{maxHeight: "500px",overflowY: "auto",paddingRight: "10px",scrollBehavior: "smooth"}}>
          {emp_posted_jobs.map((job) => (
            <div key={job.id} className="card shadow mb-4">
              <div className="card-body">
                {editingJobId === job.id ? (
                  <>
                    {/* Editable form */}
                    <p><strong>Title :</strong><input name="title" value={editFormData.title} onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Description :</strong><textarea name="description" value={editFormData.description} onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Location :</strong><input name="location" value={editFormData.location} onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Experience :</strong><input name="experience" value={editFormData.experience} onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Eligibility :</strong><input name="eligibility" value={editFormData.eligibility} onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Rating :</strong><input name="rating" value={editFormData.rating} type="tel" onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Opening :</strong><input name="opening" value={editFormData.opening} type="number" onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Reviews :</strong><input name="reviews" value={editFormData.reviews} onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Salary :</strong><input name="salary" value={editFormData.salary} onChange={handleInputChange} className="form-control mb-2" /></p>
                    
                    <p><strong>Type :</strong><input name="type" value={editFormData.type} onChange={handleInputChange} className="form-control mb-2" /></p>
                    <p><strong>Skills :</strong><input name="skills" value={editFormData.skills} onChange={handleInputChange} className="form-control mb-2" placeholder="Comma-separated skills" /></p>

                    <div className="d-flex justify-content-end">
                      <button className="btn btn-success me-2" onClick={handleEditSave}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditingJobId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Normal job card */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0">{job.title}</h5>
                      <span className="badge bg-success">{job.type}</span>
                    </div>
                    <p className="card-text">{job.description}</p>
                  <div className="row p-3 rounded " style={{ backgroundColor: "#ffffff", border: "1px solid #e9ecef" }}>
                    {/* Company Info & Job Details */}
                    <div className="col-12 col-md-7 mb-3 mb-md-0">
                      <ul className="list-unstyled" style={{ fontSize: "16px", color: "#343a40" }}>
                        <li className="mb-2">
                          <strong className="text-primary">Company:</strong> {company?.company_name || "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Experience:</strong> {job.experience ?`${job.experience}`: "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Eligibility:</strong> {job.eligibility ?`${job.eligibility}`: "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Rating:</strong> {job.rating ?`${job.rating}`: "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Reviews:</strong> {job.reviews ?`${job.reviews}`: "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Opening:</strong> {job.opening ?`${job.opening}`: "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Location:</strong> {job.location}
                        </li>
                        <li className="mb-2">
                          {/* <strong className="text-primary">Salary:</strong> ₹{job.salary} */}
                          <strong className="text-primary">Salary:</strong> {job.salary ? `₹${job.salary}` : "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Skills:</strong>{" "}
                          {Array.isArray(job.skills) ? job.skills.join(", ") : "N/A"}
                        </li>
                        <li className="mb-2">
                          <strong className="text-primary">Posted:</strong> {getTimeAgo(job.posted)}
                        </li>
                      </ul>
                    </div>

                    {/* Company Logo */}
                    <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end justify-content-center">
                      {company?.company_image ? (
                        <img
                          src={company.company_image}
                          alt="Company Logo"
                          className="img-fluid"
                          style={{
                            maxHeight: "70px",
                            padding: "8px",
                            borderRadius: "12px",
                            backgroundColor: "#f1f3f5",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                            border: "1px solid #ced4da"
                          }}
                        />
                      ) : (
                        <span className="text-muted">No logo available</span>
                      )}
                    </div>
                  </div>
                    <div className="d-flex justify-content-end my-2">
                      <button className="btn btn-outline-primary me-2" onClick={() => handleEditClick(job)}>Edit</button>
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(job.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">No jobs posted yet.</p>
      )}
    </div>
  );
};

export default Employee_Posted_Jobs;
