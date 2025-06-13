import React from 'react';

const JobImagePanel = () => {
  return (
    <img
      src="https://cdn.pixabay.com/photo/2017/12/05/15/43/jobs-2999575_1280.jpg"
      alt="Jobs"
      className="img-fluid shadow rounded sticky-top"
      style={{ height: '100vh', objectFit: 'cover' }}
    />
  );
};

export default JobImagePanel;
