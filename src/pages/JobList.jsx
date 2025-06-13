// import React, { useState, useEffect } from 'react';
// import NavBar from '../components/NavBar';
// import Footer from '../components/Footer';
// import AsideBar from '../components/AsideBar';
// import JobCardList from '../components/JobCardList';
// import Pagination from '../components/Pages';

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     jobTypes: [],
//     location: '',
//     experience: '',
//     skills: []
//   });

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs`);
//       const data = await response.json();
//       setJobs(data);
//     } catch (err) {
//       alert("Error Fetching Jobs")
//     }
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setCurrentPage(1);
//   };

//   const reversedJobs = jobs.slice().reverse();

//   // Parse experience string to number
//   const parseExperience = (exp) => {
//     if (!exp) return null;
//     exp = exp.toLowerCase();
//     if (exp === "fresher" || exp === "0 years") return 0;
//     const match = exp.match(/(\d+(\.\d+)?)/);
//     return match ? parseFloat(match[1]) : null;
//   };

//   // Match experience based on selected filter
//   const experienceMatchesFilter = (jobExpStr, filterExp) => {
//     const jobExp = parseExperience(jobExpStr);
//     if (jobExp === null) return false;

//     switch (filterExp) {
//       case "":
//         return true;
//       case "fresher":
//         return jobExp === 0;
//       case "0-1":
//         return jobExp >= 0 && jobExp <= 1;
//       case "1-3":
//         return jobExp >= 1 && jobExp <= 3;
//       case "3-5":
//         return jobExp >= 3 && jobExp <= 5;
//       case "5+":
//         return jobExp >= 5;
//       default:
//         return false;
//     }
//   };

//   const filteredJobs = reversedJobs.filter((job) => {
//     const search = searchTerm.toLowerCase();
//     const jobTitle = job.title.toLowerCase();
//     const jobLocation = job.location.toLowerCase();
//     const company = job.company.toLowerCase();
//     const jobSkills = job.skills.map((s) => s.toLowerCase());

//     const matchesSearch =
//       jobTitle.includes(search) ||
//       jobLocation.includes(search) ||
//       company.includes(search) ||
//       jobSkills.some(skill => skill.includes(search));

//     const matchesType =
//       filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);

//     const matchesLocation =
//       filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());

//     const matchesExperience =
//       filters.experience === '' || experienceMatchesFilter(job.experience, filters.experience);

//     const matchesSkills =
//       filters.skills.length === 0 ||
//       filters.skills.some(selectedSkill =>
//         jobSkills.includes(selectedSkill.toLowerCase())
//       );

//     return matchesSearch && matchesType && matchesLocation && matchesExperience && matchesSkills;
//   });

//   // Pagenation setup
//   const jobsPerPage = 3;
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const paginate = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   return (
//     <>
//       <NavBar />

//       <div className="container-fluid pt-5" style={{ backgroundColor: "#f8f9fa" }}>
//         <div className="container my-5">
//           <h2 className="text-center mb-4">Available Jobs</h2>

//           {/* Search bar */}
//           <div className="row justify-content-center mb-4">
//             <div className="col-12 col-md-8">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="🔍 Search by Job Title, Location, Skills & Company Name..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </div>
//           </div>

//           <div className="row ">
//             {/* Sidebar Filter */}
//             <div className="col-12 col-md-3 mb-4 d-none d-md-block">
//               <AsideBar onFilterChange={handleFilterChange} />
//             </div>

//             {/* Job Cards */}
//             <div className="col-12 col-md-6">
//               <JobCardList jobs={currentJobs} />

//               {filteredJobs.length > jobsPerPage && (
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   paginate={paginate}
//                 />
//               )}
//             </div>

//             {/* Image Panel */}
//             <div className="col-12 col-md-3">
//               <img
//                 src="https://cdn.pixabay.com/photo/2017/12/05/15/43/jobs-2999575_1280.jpg"
//                 alt="Jobs"
//                 className="img-fluid shadow rounded sticky-top"
//                 style={{ height: '100vh', objectFit: 'cover' }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default JobList;



import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AsideBar from '../components/AsideBar';
import JobCardList from '../components/JobCardList';
import Pagination from '../components/Pages';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobTypes: [],
    location: '',
    experience: '',
    skills: []
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/jobs`);
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      alert("Error Fetching Jobs")
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const reversedJobs = jobs.slice().reverse();

  // Parse experience string to number
  const parseExperience = (exp) => {
    if (!exp) return null;
    exp = exp.toLowerCase();
    if (exp === "fresher" || exp === "0 years") return 0;
    const match = exp.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
  };

  // Match experience based on selected filter
  const experienceMatchesFilter = (jobExpStr, filterExp) => {
    const jobExp = parseExperience(jobExpStr);
    if (jobExp === null) return false;

    switch (filterExp) {
      case "":
        return true;
      case "fresher":
        return jobExp === 0;
      case "0-1":
        return jobExp >= 0 && jobExp <= 1;
      case "1-3":
        return jobExp >= 1 && jobExp <= 3;
      case "3-5":
        return jobExp >= 3 && jobExp <= 5;
      case "5+":
        return jobExp >= 5;
      default:
        return false;
    }
  };

  const filteredJobs = reversedJobs.filter((job) => {
    const search = searchTerm.toLowerCase();
    const jobTitle = job.title.toLowerCase();
    const jobLocation = job.location.toLowerCase();
    const company = job.company.toLowerCase();
    const jobSkills = job.skills.map((s) => s.toLowerCase());

    const matchesSearch =
      jobTitle.includes(search) ||
      jobLocation.includes(search) ||
      company.includes(search) ||
      jobSkills.some(skill => skill.includes(search));

    const matchesType =
      filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);

    const matchesLocation =
      filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesExperience =
      filters.experience === '' || experienceMatchesFilter(job.experience, filters.experience);

    const matchesSkills =
      filters.skills.length === 0 ||
      filters.skills.some(selectedSkill =>
        jobSkills.includes(selectedSkill.toLowerCase())
      );

    return matchesSearch && matchesType && matchesLocation && matchesExperience && matchesSkills;
  });

  // Pagenation setup
  const jobsPerPage = 3;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <NavBar />

      <div className="container-fluid pt-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container my-5">
          <h2 className="text-center mb-4">Available Jobs</h2>

          {/* Search bar */}
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search by Job Title, Location, Skills & Company Name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="row ">
            {/* Sidebar Filter */}
            <div className="col-12 col-md-3 mb-4 d-none d-md-block">
              <AsideBar onFilterChange={handleFilterChange} />
            </div>

            {/* Job Cards */}
            <div className="col-12 col-md-6">
              <JobCardList jobs={currentJobs} />

              {filteredJobs.length > jobsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              )}
            </div>

            {/* Image Panel */}
            <div className="col-12 col-md-3">
              <img
                src="https://cdn.pixabay.com/photo/2017/12/05/15/43/jobs-2999575_1280.jpg"
                alt="Jobs"
                className="img-fluid shadow rounded sticky-top"
                style={{ height: '155vh', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JobList;
