import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
        </li>

        {/* Page numbers */}
        {[...Array(totalPages).keys()].map(num => (
          <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(num + 1)}>{num + 1}</button>
          </li>
        ))}

        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
