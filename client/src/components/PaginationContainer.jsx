import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { numOfPages, params } = useLoaderData();
  const currentPage = parseInt(params.page) || 1;

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (numOfPages < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) prevPage = numOfPages;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNumber === currentPage ? "bg-base-300 border-base-300" : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
