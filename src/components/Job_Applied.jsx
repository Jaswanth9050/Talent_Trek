import React, { useEffect, useState } from 'react'

const Job_Applied = () => {

    const studentid = localStorage.getItem('user_id'); // should be string if db.json has "student_id": "123"
  const [application, setApplication] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
        try {
            console.log(`Fetching all applications`);
            // const res = await fetch(`http://localhost:3000/application_data`);
            const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/application_data`);
            const data = await res.json();

            const filtered = data.filter(
            item => item.student_id && item.student_id === studentid
            );

            console.log("Filtered Applications (manually):", filtered);
            setApplication(filtered);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    console.log(application)

  
// DELETE request to withdraw application
  const handleWithdraw = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to withdraw this application?");
    if (!confirmDelete) return;

    try {
      // await fetch(`http://localhost:3000/application_data/${id}`, {
      await fetch(`${import.meta.env.VITE_DB_RENDER}/application_data/${id}`, {
        method: 'DELETE'
      });

      // Refetch updated applications after deletion
      fetchData();
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  return (
    <>

    <div className="container mt-5">
  <h2 className="text-center mb-4 text-center text-secondary mb-4 border-bottom pb-2">Jobs You Have Applied For</h2>

  {application.length > 0 ? (
    <table className="table table-bordered mt-3">
      <thead className="table-primary">
        <tr>
          <th>Student ID</th>
          <th>Full Name</th>
          <th>Job Title</th>
          <th>Job ID</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {application.map((app, index) => (
          <tr key={index}>
            <td>{app.student_id}</td>
            <td>{app.student_fullName}</td>
            <td>{app.title}</td>
            <td>{app.id}</td>
            <td>{app.date}</td>
            <td>
              <button className="btn btn-danger btn-sm me-2" onClick={() => handleWithdraw(app.id)}>Withdraw</button>
              <button className="btn btn-success btn-sm">Process</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="alert alert-info text-center">
      No Job Applied At Now
    </div>
  )}
</div>


</>
  )
}

export default Job_Applied
