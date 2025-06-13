import React from 'react';
import { Briefcase, Star, Users, GraduationCap } from 'lucide-react'; // You can also use Bootstrap or FontAwesome if preferred

const Webinfo = () => {
  const stats = [
    {
      icon: <Briefcase size={32} className="text-primary mb-2" />,
      title: '300K+',
      label: 'Companies Hiring',
    },
    {
      icon: <Star size={32} className="text-warning mb-2" />,
      title: '10K+',
      label: 'New Openings Every Day',
    },
    {
      icon: <Users size={32} className="text-success mb-2" />,
      title: '21Mn+',
      label: 'Active Students',
    },
    {
      icon: <GraduationCap size={32} className="text-danger mb-2" />,
      title: '600K+',
      label: 'Learners',
    },
  ];

  return (
    <div className="container-fluid bg-white py-5 mt-4 shadow-sm rounded">
      <div className="container">
        <div className="row text-center g-4">
          {stats.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <div className="p-3 border-end h-100">
                {item.icon}
                <h1
                  className="fw-bold"
                  style={{
                    fontSize: '42px',
                    background: 'linear-gradient(to right, #007bff, #ff4081)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {item.title}
                </h1>
                <p className="mb-0 text-secondary">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Webinfo;