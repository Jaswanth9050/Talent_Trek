import React, { useState, useEffect } from "react";

const AsideBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    jobTypes: [],
    experience: "",
    location: "",
    skills: []
  });

  // Notify parent component on any filter change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  // Helper to toggle value in array
  function toggleValue(array, value) {
    return array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];
  }

  // Handle checkbox changes for jobTypes and skills
  function handleCheckboxChange(e, category) {
    const value = e.target.id;
    setFilters((prev) => ({
      ...prev,
      [category]: toggleValue(prev[category], value)
    }));
  }

  // Handle experience select change
  function handleSelectChange(e) {
    setFilters((prev) => ({
      ...prev,
      experience: e.target.value
    }));
  }

  // Handle location text input change
  function handleLocationChange(e) {
    setFilters((prev) => ({
      ...prev,
      location: e.target.value
    }));
  }

  // Reset all filters
  function handleReset() {
    setFilters({
      jobTypes: [],
      experience: "",
      location: "",
      skills: []
    });
  }

  return (
    <div className="bg-white p-3 shadow rounded sticky-top" style={{ top: '80px' }}>
      <h5>🎯 Job Filters</h5>
      <hr />

      {/* Job Type */}
      <h6>Job Type</h6>
      {["Full-time", "Part-time", "Internship","Contract"].map((type) => (
        <p key={type}>
          <input
            className="form-check-input me-2"
            type="checkbox"
            id={type}
            checked={filters.jobTypes.includes(type)}
            onChange={(e) => handleCheckboxChange(e, "jobTypes")}
          />
          {type}
        </p>
      ))}

      {/* Experience */}
      <h6 className="mt-3">Experience</h6>
      <select
  className="form-select mb-3"
  value={filters.experience}
  onChange={handleSelectChange}
>
  <option value="">All Levels</option>
  <option value="fresher">Fresher</option>
  <option value="0-1">0-1 years</option>
  <option value="1-3">1-3 years</option>
  <option value="3-5">3-5 years</option>
  <option value="5+">5+ years</option>
</select>

      {/* Location */}
      <h6>Location</h6>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter city"
        value={filters.location}
        onChange={handleLocationChange}
      />

      {/* Skills */}
      <h6>Skills</h6>
      {["HTML", "CSS","JavaScript", "Python","Java","React", "Django","MySQL","MongoDB","DevOps","Typing","Ms Excel"].map((skill) => (
        <p key={skill}>
          <input
            className="form-check-input me-2"
            type="checkbox"
            id={skill}
            checked={filters.skills.includes(skill)}
            onChange={(e) => handleCheckboxChange(e, "skills")}
          />
          {skill}
        </p>
      ))}

      {/* Reset Button */}
      <button className="btn btn-outline-secondary w-100 mt-3" onClick={handleReset}>
        🔄 Reset Filters
      </button>
    </div>
  );
};

export default AsideBar;
