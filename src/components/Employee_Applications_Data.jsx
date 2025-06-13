import React, { useEffect, useState } from 'react';

const Employee_Applications_Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const res = await fetch('http://localhost:3000/application_data');
      const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/application_data`);
      const resData = await res.json();

      const employee_id = localStorage.getItem("Emp_Id");
      const filterData = resData.filter(item => item.Emp_Id === employee_id);

      setData(filterData);
    } catch (error) {
      console.log("Error in Fetching", error);
    }
  };
  const application_count=data.length
  console.log(application_count)

  const handleDelete = async (id) => {
    try {
      // await fetch(`http://localhost:3000/application_data/${id}`, { method: 'DELETE' });
      await fetch(`${import.meta.env.VITE_DB_RENDER}/application_data/${id}`, { method: 'DELETE' });
      setData(prev => prev.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className='col-12 col-md-8 col-lg-9'>
    <div className="d-flex justify-content-between align-items-center bg-primary text-white py-3 px-4 rounded shadow-sm mb-4">
        <h2 className="mb-0">
            📋 Applications Review Panel
        </h2>
        <h5 className="mb-0">
            Application_Count: {application_count}
        </h5>
    </div>

      <div style={{
        maxHeight: "75vh",
        overflowY: "auto",
        paddingRight: "10px",
        scrollBehavior: "smooth"
      }}>
        {data.length > 0 ? data.map((job) => (
          <div key={job.id} className="card mb-4 shadow-sm border border-light">
            <div className="card-header bg-gradient bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{job.student_fullName}</h5>
              <span className="badge bg-light text-dark">#{job.id}</span>
            </div>
            <div className="card-body bg-light">
              <p className="mb-1"><strong>Email:</strong> <span className="badge bg-info text-dark">{job.student_email}</span></p>
              <p className="mb-3"><strong>Phone:</strong> <span className="badge bg-secondary">{job.student_phone}</span></p>

              <h6 className="text-muted">📝 Cover Letter</h6>
              <p className="p-3 bg-white rounded border fst-italic">
                {job.student_coverLetter}
              </p>

                {job.student_resume ? (
                    <div className="mt-4">
                        <h6 className="text-success">Resume Preview</h6>
                        <iframe
                        src={`/${job.student_resume}`}
                        width="100%"
                        height="400px"
                        title="Resume"
                        className="border rounded"
                        ></iframe>
                        <div className="d-flex gap-3 mt-3">
                            <a
                                href={`/${job.student_resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary"
                            >
                                View Resume
                            </a>

                           <div className='ms-auto'>
                             <button className="btn btn-success mx-2">
                                Selected
                            </button>
                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(job.id)}>
                                Delete
                            </button>
                           </div>
                        </div>

                    </div>
                    ) : (
                    <p className="text-danger mt-4">Resume not uploaded.</p>
                )}


              
            </div>
          </div>
        )) : (
          <div className="alert alert-info text-center">No applications found for this employee.</div>
        )}
      </div>
    </div>
  );
};

export default Employee_Applications_Data;
