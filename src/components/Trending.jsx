// FInal Design CODE

import React from 'react';

const Trending = () => {
  const cardStyle = {
    borderRadius: '20px',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold" style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #0d6efd, #ffc107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        🚀 Trending on <span style={{ color: '#0d6efd' }}>Talent Trek</span>
      </h2>
      <div className="row g-5">
        
        {/* Online Courses */}
        <div className="col-md-4">
          <div style={{ ...cardStyle, background: "linear-gradient(135deg, #2A7B9B, #57C785, #EDDD53)" }} className="p-4 text-center h-100">
            <h5 className="fw-bold">📚 Online Courses</h5>
            <p className="mb-3">Master In-Demand Skills</p>
            <p>Enroll in job-ready tech programs with expert-led classes and hands-on projects.</p>
            <img src="https://i.pinimg.com/474x/2b/08/09/2b080920ee04d1e2e08c3814aa90bae4.jpg" alt="Online Courses" className="img-fluid rounded mb-3" style={{ height: '250px', objectFit: 'cover' }} />
            <button className="btn btn-outline-light fw-bold">Know More</button>
          </div>
        </div>

        {/* Resume Builder */}
        <div className="col-md-4">
          <div style={{ ...cardStyle, background: "linear-gradient(135deg, #020024, #090979, #00d4ff)" }} className="p-4 text-center h-100">
            <h5 className="fw-bold">📝 Resume Builder</h5>
            <p className="mb-3">Stand Out to Recruiters</p>
            <p>Build ATS-friendly, professional resumes with industry-approved templates.</p>
            <img src="https://instaresume.io/section_1.webp" alt="Resume Builder" className="img-fluid rounded mb-3" style={{ height: '250px', objectFit: 'cover' }} />
            <button className="btn btn-outline-light fw-bold">Build Resume</button>
          </div>
        </div>

        {/* Mock Interviews */}
        <div className="col-md-4">
          <div style={{ ...cardStyle, background: "linear-gradient(135deg, #212529, #46468E, #91DEE4)" }} className="p-4 text-center h-100">
            <h5 className="fw-bold">🎤 Mock Interviews</h5>
            <p className="mb-3">Prepare With Confidence</p>
            <p>Practice with real interview questions and expert feedback to ace your next job call.</p>
            <img src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-job-interview-communication-png-image_10232411.png" alt="Mock Interviews" className="img-fluid rounded mb-3" style={{ height: '250px', objectFit: 'cover' }} />
            <button className="btn btn-outline-light fw-bold">Start Practicing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
