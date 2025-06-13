import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Employee_Create_Jobs = () => {
    let emp_id=localStorage.getItem("Emp_Id")
    let company_name_local=localStorage.getItem("company_name")
  // Form data stored one by one
  const [jobForm, setJobForm] = useState({
    title: '',
    type: '',
    location: '',
    description: '',
    skills: [],
    salary: '',
    experience:'',
    rating:'',
    reviews:'',
    posted: '',
    opening:'',
    eligibility:'',



    Emp_Id:emp_id,
    company:company_name_local,
  });

  // Skill input box state
  const [skillInput, setSkill] = useState('');

  // Store all the data (store the JobForm data in this state)
  const [jobData, setJobData] = useState(null);



  // Navigation path when click on post a job
  const go = useNavigate(); // ✅ Fixed: you commented this out. It is needed for navigation.

  // Fetching the data from activejobs in db.json file
  const fetchRegisterData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs`);
      const Responsedata = await response.json();
      setJobData(Responsedata);
    } catch (error) {
      alert("Error in Fetching Jobs \n Try Again Later")
    }
  };

  useEffect(() => {
    fetchRegisterData();
  }, []);

  // Handle form input change
  const handleChangeJobData = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add a skill
  const handleSkill = () => {
    if (skillInput.trim() !== '') {
      setJobForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkill('');
    }
  };

  // Remove skill by index
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...jobForm.skills];
    updatedSkills.splice(index, 1);
    setJobForm((prev) => ({
      ...prev,
      skills: updatedSkills, // ❌ Typo fixed: you wrote `skils` instead of `skills`
    }));
  };

  // Handle form submission
  const handlePostJob = async (e) => {
    e.preventDefault();

    // Required fields validation
    if (!jobForm.title || !jobForm.type) {
      alert('Please fill out "Job Title" and "Job Type" fields.');
      return;
    }



  
    // Set the current date for the posted field
    const currentDate = new Date().toISOString();

    // Include the current date in the job form data
    const jobWithPostedDate = {
      ...jobForm,
      posted: currentDate, // Add the posted date
    };

    try {
      const jobresponse = await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobWithPostedDate), // ❌ Error fixed: you used undefined variable `activejobs`
      });

      const jobResult = await jobresponse.json();
      setJobData((prev) => [...prev, jobResult]);

      // Reset the form after successful submission
      setJobForm({
        title: '',
        type: '',
        location: '',
        description: '',
        skills: [],
        salary: '',
        experience:'',
        rating:'',
        reviews:'',
        posted: '',
        opening:'',
        eligibility:'',
      });

      // Navigate to posted jobs
      go('/employee/posted_jobs'); // ✅ Fixed: uncommented navigation

    } catch (error) {
      alert('Error In Submitting Data \n Try Again Later')
    }
  };



  return (
    <div className='col-12 col-md-8 col-lg-9'>
      <h1 className='text-center text-white mb-4'>Create A Job</h1>

      <div style={{maxHeight: "500px",overflowY: "auto",paddingRight: "10px",scrollBehavior: "smooth"}}>

        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title mb-4">Job Details</h5>
            <form onSubmit={handlePostJob}>
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input type="text" className="form-control" placeholder="e.g., Frontend Developer"
                        name='title' value={jobForm.title} onChange={handleChangeJobData} />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input type="text" className="form-control" placeholder="e.g., Remote or Hyderabad" 
                name='location' value={jobForm.location} onChange={handleChangeJobData} />
              </div>

              <div className="mb-3">
                <label className="form-label">Job Type</label>
                <select className="form-select" name='type' value={jobForm.type} onChange={handleChangeJobData} >
                  <option value="">Select Type</option>
                  <option value="Full-time">Full Time</option>
                  <option value="Part-time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="4" placeholder="Describe the job role and responsibilities..." name='description' value={jobForm.description} onChange={handleChangeJobData} ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Experience</label>
                <input type="tel" className="form-control" placeholder="e.g., 1 – 2 years"  name='experience' value={jobForm.experience} onChange={handleChangeJobData} />
              </div>


              <div className="mb-3">
                <label className="form-label">Required Skills</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., React, Node.js, CSS"
                  value={skillInput}
                  onChange={(e) => setSkill(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={handleSkill}
                >
                  Add Skill
                </button>

                {/* Display skills */}
                <div className="mt-3 d-flex flex-wrap gap-2">
                  {jobForm.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary d-flex align-items-center"
                      style={{ padding: '8px 12px', fontSize: '14px' }}
                    >
                      {skill}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        onClick={() => handleRemoveSkill(index)}
                        style={{ fontSize: '10px' }}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-3 d-flex gap-3">
                <div>
                  <label className="form-label">Opening: </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g., 100"
                    name="opening"
                    value={jobForm.opening}
                    onChange={handleChangeJobData}
                  />
                </div>
                <div>
                  <label className="form-label">Rating: </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="e.g., 4.5"
                    name="rating"
                    value={jobForm.rating}
                    onChange={handleChangeJobData}
                  />
                </div>
                <div>
                  <label className="form-label">Review: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., 45"
                    name="reviews"
                    value={jobForm.reviews}
                    onChange={handleChangeJobData}
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Eligibility</label>
                <input type="text" className="form-control" placeholder="Any Graduate"  name='eligibility' value={jobForm.eligibility} onChange={handleChangeJobData} />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary Range</label>
                <input type="text" className="form-control" placeholder="e.g., ₹4 LPA – ₹8 LPA"  name='salary' value={jobForm.salary} onChange={handleChangeJobData} />
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary">Post Job</button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Employee_Create_Jobs;
