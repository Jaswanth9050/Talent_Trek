import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Application = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // get localStorage Data
  const username=localStorage.getItem("user")
  const user_email=localStorage.getItem("user_email")

  const [formData, setFormData] = useState({
    fullName: username || '',
    email: user_email || '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  const [jobInfo, setJobInfo] = useState({ title: '', company: '',Emp_Id:'',id:'' });

  const today = new Date();
  const formattedDate = today.toLocaleDateString(); // eg: "6/10/2025"
  console.log(formattedDate);

  // Fetch job info
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs`);
        const data = await response.json();
        const foundJob = data.find((job) => job.id === id);// here we can see two id's first is db.json id and second is page (useParams{id})
        if (foundJob) {
          setJobInfo({ title: foundJob.title, company: foundJob.company,Emp_Id:foundJob.Emp_Id,job_id:id });
        } else {
          console.log("Job not found!");
        }
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      }
    };
    fetchJob();
  }, [id]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit with EmailJS
  const handleSubmit =async (e) => {
    e.preventDefault();
    
    // what are the data need to store in db.json file
    // Prepare application data
    const applicationdata = {
      student_fullName: formData.fullName,
      student_email: formData.email,
      student_phone: formData.phone,
      student_resume: formData.resume ? formData.resume.name : '', // or you can store base64 if needed
      student_coverLetter: formData.coverLetter,
      title: jobInfo.title,
      company: jobInfo.company,
      Emp_Id: jobInfo.Emp_Id,
      job_id:id,
      student_id:localStorage.getItem('user_id'),
      date:formattedDate
    };

    // save the applicatondata in db.json
    try {


       // ✅ Step 1: Check for duplicate application
      const checkResponse = await fetch(`${import.meta.env.VITE_DB_RENDER}/application_data`);
      const existingApps = await checkResponse.json();

      const alreadyApplied = existingApps.some(
        (app) => app.job_id === jobInfo.job_id && app.student_email === formData.email
      );

      if (alreadyApplied) {
        alert("⚠️ You have already applied for this job!");
        return;
      }

      const applicationresponse=await fetch(`${import.meta.env.VITE_DB_RENDER}/application_data`,{
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify(applicationdata),
      });

      if (!applicationresponse.ok) throw new Error("Failed to store data");

      alert('🎉 Application stored successfully!');

    } catch (error) {
      console.error(error);
      alert('❌ Failed to store application data. Try again later.');
      return;
    }

    //-------------------------- Send email using EmailJS section start-------------------------

    // Send email using EmailJS

    const templateParams = {
      name: formData.fullName,
      email: formData.email,
      title: jobInfo.title,
      company_name: jobInfo.company
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("📧 Email sent successfully!");
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("⚠️ Failed to send email. Please try again.");
    }

    //-------------------------- Send email using EmailJS section End-------------------------
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: ''
    });

    navigate('/');
  };

  //---------------------------- Send Email using EmailJS section end---------------------

  return (
  <>

    <div className="container my-5">
      <div className="card shadow p-4">
        <div className="mb-4 text-center">
          <h2 className="text-primary">{jobInfo.title}</h2>
          <p className="text-secondary fs-5">
            <i className="bi bi-building me-2"></i>{jobInfo.company}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Resume</label>
            <input
              type="file"
              name="resume"
              className="form-control"
              onChange={handleChange}
              required
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cover Letter</label>
            <textarea
              name="coverLetter"
              className="form-control"
              rows="5"
              value={formData.coverLetter}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  </>
    
  );
};

export default Application;
