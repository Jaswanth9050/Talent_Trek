import React, { useEffect, useState } from 'react';

function CompanySelector({ selectedCompany, setFormdata }) {
  const [companies, setCompanies] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [tempCompanyDetails, setTempCompanyDetails] = useState(null); // ✅ holds editable copy
  const [showDetails, setShowDetails] = useState(false);
  const [editing, setEditing] = useState(false);

  const [newCompany, setNewCompany] = useState({
    company_name: '',
    company_image: '',
    company_about: '',
    company_website: '',
    company_location: '',
    company_email: '',
    company_founded: '',
    company_size: '',
    company_linked_in:'',
    company_facebook:'',
    company_twitter_X:'',
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DB_RENDER}/company`)
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  const handleCompanyChange = (e) => {
    const selected = e.target.value;
    if (selected === 'Other') {
      setIsOtherSelected(true);
      setFormdata((prev) => ({ ...prev, company: '' }));
      setCompanyDetails(null);
      setShowDetails(false);
    } else {
      setIsOtherSelected(false);
      setFormdata((prev) => ({ ...prev, company: selected }));
      const selectedComp = companies.find(c => c.company_name === selected);
      setCompanyDetails(selectedComp || null);
      setShowDetails(false);
    }
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({ ...prev, [name]: value }));
    if (name === "company_name") {
      setFormdata((prev) => ({ ...prev, company: value }));
    }
  };

  const handleNewCompanySave = async () => {
    if (!newCompany.company_name || !newCompany.company_image) {
      alert("Please enter both name and image URL.");
      return;
    }

    const exists = companies.some(c => c.company_name.toLowerCase() === newCompany.company_name.toLowerCase());
    if (exists) {
      alert("Company already exists!");
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/company`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCompany)
    });

    const saved = await res.json();
    setCompanies([...companies, saved]);
    setIsOtherSelected(false);
    setFormdata((prev) => ({ ...prev, company: newCompany.company_name }));
    setNewCompany({
      company_name: '',
      company_image: '',
      company_about: '',
      company_website: '',
      company_location: '',
      company_email: '',
      company_founded: '',
      company_size: '',
      company_linked_in:'',
      company_facebook:'',
      company_twitter_X:'',
    });
  };

  const handleSaveEdit = () => {
    setCompanyDetails(tempCompanyDetails);
    setTempCompanyDetails(null);
    setEditing(false);
  };

  return (
    <div>
      <label><b>Select Company</b></label>
      <select
        value={selectedCompany || ''}
        onChange={handleCompanyChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        <option value="">-- Select Company --</option>
        {companies.map(c => (
          <option key={c.id} value={c.company_name}>{c.company_name}</option>
        ))}
        <option value="Other">Other</option>
      </select>

      {/* View Details button */}
      {companyDetails && !isOtherSelected && !showDetails && (
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          style={{ background: '#3182ce', color: '#fff', padding: '8px 12px', border: 'none' }}
          className='btn'
        >
          View Details
        </button>
      )}

      {/* Company Details */}
      {companyDetails && showDetails && (
        <div style={{ border: '1px solid #ccc', padding: '12px', marginTop: '10px' }}>
          {(editing ? tempCompanyDetails : companyDetails) &&
            Object.entries(editing ? tempCompanyDetails : companyDetails).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '8px' }}>
                <label style={{ fontWeight: 'bold' }}>
                  {key.replace("company_", "").replace("_", " ")}:
                </label>
                {editing ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={(e) =>
                      setTempCompanyDetails((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    style={{ width: '100%', padding: '6px', marginTop: '4px' }}
                  />
                ) : (
                  <div>{value}</div>
                )}
              </div>
            ))}

          {!editing ? (
            <div>
              {/* ✅ Edit button initializes temporary state */}
              <button
                type="button"
                onClick={() => {
                  setTempCompanyDetails({ ...companyDetails });
                  setEditing(true);
                }}
                // style={{ background: 'green', color: 'white', padding: '6px 12px', marginRight: '10px' }}
                className='btn btn-outline-success me-3'
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                  setEditing(false);
                  setTempCompanyDetails(null);
                }}
                // style={{ background: '#e53e3e', color: 'white', padding: '6px 12px' }}
                className='btn btn-outline-danger'
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={handleSaveEdit}
                // style={{ background: 'blue', color: 'white', padding: '6px 12px', marginRight: '10px' }}
                className='btn btn-outline-primary me-3'
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setTempCompanyDetails(null); // ✅ discard changes
                  setEditing(false);
                }}
                className='btn btn-outline-danger'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* New Company Form */}
      {isOtherSelected && (
        <div style={{ marginTop: '10px' }}>
          {Object.entries(newCompany).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '8px' }}>
              <label style={{ fontWeight: 'bold' }}>
                {key.replace("company_", "").replace("_", " ")}:
              </label>
              <input
                type="text"
                name={key}
                value={value}
                placeholder={`Enter ${key.replace("company_", "").replace("_", " ")}`}
                onChange={handleNewCompanyChange}
                style={{ width: '100%', padding: '6px', marginTop: '4px' }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleNewCompanySave}
            style={{ padding: '10px', background: '#5a67d8', color: '#fff', border: 'none' }}
          >
            Save Company
          </button>
        </div>
      )}
    </div>
  );
}

export default CompanySelector;
