import React from 'react';

// JobSearchBar receives searchTerm and setSearchTerm as props from parent
const JobSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col-12 col-md-8">
        {/* Input box for job search */}
        <input
          type="text"
          className="form-control"
          placeholder="Search by job title,location,skils & company..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); // Update search term when user types
          }}
        />
      </div>
    </div>
  );
};

export default JobSearchBar;
