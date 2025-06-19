import React from "react";
import { useMovieStore } from "../store/movieStore";

const Pagination: React.FC = () => {
  const { page, totalPages, setPage } = useMovieStore();

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">
        {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
