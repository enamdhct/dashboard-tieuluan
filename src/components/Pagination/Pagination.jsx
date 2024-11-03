import React from 'react';
import ReactPaginate from 'react-paginate';


const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className='flex flex-row justify-between items-center'>
        <p className="text-gray-600">
            Trang {currentPage} trên {totalPages}
        </p>
        <div id="pagination-container">
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={onPageChange}
                previousLabel={'Trang trước'} 
                nextLabel={'Trang sau'} 
                containerClassName={'flex space-x-2'}
                activeClassName={'bg-sky-500 text-white'}
                pageClassName={'bg-gray-100 p-2 rounded'}
                pageLinkClassName={'cursor-pointer'}
                previousClassName={'bg-gray-100 p-2 rounded'}
                nextClassName={'bg-gray-100 p-2 rounded'}
                breakClassName={'bg-gray-100 p-2 rounded'}
            />
        </div>
    </div>
  );
};

export default Pagination;