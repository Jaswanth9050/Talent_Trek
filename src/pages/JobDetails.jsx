import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTimeAgo } from '../utility';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // Fetch all jobs and filter the job by id
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs`);
        const data = await response.json();
        const foundJob = data.find((item) => item.id === id);
        setJobDetails(foundJob);
        if (!foundJob) throw new Error("Job not Found");
      } catch (err) {
        console.log("Error fetching job:", err.message);
      }
    };
    fetchJobs();
  }, [id]);

  // Extract company name after jobDetails is loaded
  const company = jobDetails?.company || "";

  // Fetch company info only when company name is available
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (company.trim() !== "") {
          const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/company?company_name=${company}`);
          const data = await response.json();
          if (data.length > 0) {
            setCompanyData(data[0]);
          } else {
            console.log("Company not found in DB.");
          }
        } else {
          console.log("No company name provided, skipping fetch.");
        }
      } catch (error) {
        console.log("Error in Fetching Company:", error);
      }
    };

    fetchCompany();
  }, [company]);

  const back = () => {
    navigate('/jobs');
  };
  const apply=()=>{
    navigate(`/jobs/${id}/application_from`)
  }

  // Show loading while jobDetails is null
  if (!jobDetails) {
    return <div className="text-center mt-10 text-gray-500">Loading job details...</div>;
  }

  const {
    title,
    rating,
    reviews,
    image,
    experience,
    location,
    description,
    skills,
    posted,
    salary,
    eligibility,
    opening,
    type
  } = jobDetails;

  const imageToShow = image || companyData?.company_image || "";

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        {/* Header */}
        <div className="row align-items-center g-4">
          <div className="col-md-3 text-center">
            <img
              src={imageToShow}
              alt={company}
              className="img-fluid rounded-4 border shadow-sm"
              style={{ width: '100px', height: '100px', objectFit: 'fit' }}
            />
          </div>
          <div className="col-md-9">
            <div>
              <div className="row align-items-center">
                <div className="col-md-9">
                  <h2 className="fw-bold text-primary mb-2">{title}</h2>
                  <p className="text-secondary fs-5 mb-1"><i className="bi bi-building me-2"></i>{company}</p>

                  <div className="d-flex align-items-center mt-2">
                    <span className="badge bg-warning text-dark me-2 px-3 py-2 fs-6">
                      ⭐ {rating}
                    </span>
                    <span className="text-muted ms-1 fs-6">({reviews} reviews)</span>
                  </div>
                </div>

                <div className="col-md-3 text-md-end text-center mt-4 mt-md-0">
                  <span className="badge bg-success text-white fs-6 p-3 rounded-pill">
                    <strong className="me-1">Openings:</strong> {opening || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Details */}

            <div className="row mt-3 text-muted">
              <div className="col-sm-4"><strong>Experience:</strong> {experience || "N/A"}</div>
              <div className="col-sm-4"><strong>Location:</strong> {location || "N/A"}</div>
              <div className="col-sm-4"><strong>Type:</strong> {type}</div>
              <div className="col-sm-4"><strong>Salary:</strong> {salary || "N/A"}</div>
              <div className="col-sm-4"><strong>Posted:</strong> {getTimeAgo(posted)}</div>
              <div className="col-sm-4"><strong>Eligibility:</strong> {eligibility || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h5 className="fw-semibold border-bottom pb-2">Job Description</h5>
          <p className="text-secondary mt-3">{description}</p>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <h5 className="fw-semibold border-bottom pb-2">Required Skills</h5>
          <div className="mt-3 d-flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <span key={index} className="badge bg-primary-subtle text-primary fw-medium px-3 py-2 rounded-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Full Company Profile */}
        {companyData && (
          <div className="mt-4">
            <h5 className="fw-semibold border-bottom pb-2">About {companyData.company_name}</h5>
            <p className="text-secondary mt-2">{companyData.company_about}</p>
            <ul className="list-unstyled text-muted mt-3">
              <li><strong>Website:</strong> <a href={companyData.company_website} target="_blank" rel="noreferrer">{companyData.company_website?`${companyData.company_website}`:"N/A"}</a></li>
              <li><strong>Email:</strong> {companyData.company_email?`${companyData.company_email}`:"N/A"}</li>
              <li><strong>Founded:</strong> {companyData.company_founded?`${companyData.company_founded}`:'N/A'}</li>
              <li><strong>Company Size:</strong> {companyData.company_size?`${companyData.company_size}`:'N/A'}</li>
              <li><strong>HeadQuarters_Location:</strong> {companyData.company_location?`${companyData.company_location}`:'N/A'}</li>
            </ul>
            
            {/* Social Media Links */}
            <div className="mt-3">
              {companyData.company_linked_in && (
                <a href={companyData.company_linked_in} target="_blank" rel="noreferrer" className="me-3 text-decoration-none text-primary">
                  <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
                </a>
              )}
              {companyData.company_facebook && (
                <a href={companyData.company_facebook} target="_blank" rel="noreferrer" className="me-3 text-decoration-none text-primary">
                  <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
                </a>
              )}
              {companyData.company_twitter_X && (
                <a href={companyData.company_twitter_X} target="_blank" rel="noreferrer" className="text-decoration-none text-dark">
                  <i className="bi bi-twitter-x" style={{ fontSize: '1.5rem' }}></i>
                </a>
              )}
            </div>
            
          </div>
        )}


        {/* CTA */}
        <div className="mt-4 text-end">
          <button className="btn btn-primary btn-lg px-4 shadow-sm" onClick={apply}>
            Apply Now
          </button>
          <button className="btn btn-danger btn-lg px-4 shadow-sm mx-2" onClick={back}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
