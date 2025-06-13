import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../utility";

const JobCard = ({ job }) => {
  const {
    id,
    title,
    company,
    rating,
    reviews,
    image,
    experience,
    location,
    description,
    skills,
    posted,
    salary,
    opening,
    type
  } = job;

  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        console.log("Fetching for company:", company); // Debug
        // const response = await fetch(`http://localhost:3000/company?company_name=${company}`);
        const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/company?company_name=${company}`);
        const data = await response.json();
        console.log("Fetched company data:", data); // Debug
  
        if (data.length > 0) {
          setCompanyData(data[0]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    fetchCompany();
  }, [company]);
  
  
  // Decide what image to show
  let imageToShow = image || companyData?.company_image || null;

  return (
    <div className="card w-100 my-3 shadow-sm p-3" style={{ maxWidth: "800px" }}>
      <div className="d-flex align-items-center mb-3">
        {imageToShow ? (
          <img
            src={imageToShow}
            alt={`${company} logo`}
            className="rounded me-3"
            style={{ width: "60px", height: "60px", objectFit: "fit" }}
          />
        ) : (
          <div
            className="rounded me-3 d-flex align-items-center justify-content-center bg-light text-muted"
            style={{
              width: "60px",
              height: "60px",
              fontSize: "12px",
              fontWeight: "bold",
              border: "1px solid #ced4da"
            }}
          >
            {company}
          </div>
        )}
        <div>
          <h5 className="mb-0">{title}</h5>
          <small className="text-muted">{company}</small>
        </div>
        <div className="ms-auto text-end">
          <span className="badge bg-success">{rating} ★</span><br />
          <small className="text-muted">{reviews} reviews</small>
        </div>
      </div>

      <p className="mb-2">{description.slice(0, 150)}...</p>

      <div className="mb-2">
        <strong>Skills: </strong>
        {skills?.map((skill, index) => (
          <span key={index} className="badge bg-secondary me-1">
            {skill}
          </span>
        ))}
      </div>

      <div className="d-flex justify-content-between flex-wrap text-muted">
        <small><strong>Location:</strong> {location?`${location}`:"N/A"}</small>
        <small><strong>Experience:</strong> {experience?`${experience}`:"N/A"} yrs</small>
        <small><strong>Type:</strong> {type}</small>
        <small><strong>Salary:</strong> {salary?`${salary}`:"N/A"}</small>
        <small><strong>Posted:</strong> {getTimeAgo(job.posted)}</small>
        <small><strong>Opening:</strong> {opening?`${opening}`:"N/A"}</small>
      </div>

      <Link to={`/jobs/${id}`}>
        <button className="btn btn-outline-primary m-2">View More</button>
      </Link>
    </div>
  );
};

export default JobCard;
