import React, { useState, useEffect } from "react";
import AsideBar from "./AsideBar";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobTypes: [],
    experience: "",
    location: "",
    skills: []
  });

  useEffect(() => {
    // fetch("http://localhost:3000/activejobs")
    fetch(`${import.meta.env.VITE_DB_RENDER}/activejobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      });
  }, []);

  const applyFilters = () => {
    const result = jobs.filter((job) => {
      const jobType = job.type?.toLowerCase() || "";
      const experience = job.experience?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";
      const jobSkills = job.skills?.map((s) => s.toLowerCase()) || [];

      const matchJobType =
        filters.jobTypes.length === 0 ||
        filters.jobTypes.includes(jobType);

      const matchExperience =
        filters.experience === "" ||
        filters.experience === experience;

      const matchLocation =
        filters.location === "" ||
        location.includes(filters.location.toLowerCase());

      const matchSkills =
        filters.skills.length === 0 ||
        filters.skills.every((skill) => jobSkills.includes(skill.toLowerCase()));

      return matchJobType && matchExperience && matchLocation && matchSkills;
    });

    setFilteredJobs(result);
  };

  return (
    <div className="d-flex">
      <AsideBar filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
      <div className="ms-5 p-4" style={{ marginLeft: "270px", width: "100%" }}>
        <h3>Filtered Jobs</h3>
        {filteredJobs.length === 0 ? (
          <p>No jobs found for selected filters.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="card mb-3 p-3">
              <h5>{job.title}</h5>
              <p>{job.company}</p>
              <p>{job.type} | {job.experience} | {job.location}</p>
              <p>Skills: {job.skills.join(", ")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobBoard;
