import React from 'react';
import JobCard from './JobCard'; // Reuse JobCard component

const JobCardList = ({ jobs }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {/* Check if jobs are available */}
      {jobs.length > 0 ? (
        jobs.map((job, idx) => (
          <JobCard key={idx} job={job} />
        ))
      ) : (
        <div className="text-muted">No jobs available.</div>
      )}
    </div>
  );
};

export default JobCardList;
