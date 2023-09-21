import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "react-feather";
import "./PaginationView.css";

const RenderPaginationButtons = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="pagination-view">
      <button
        disabled={currentPage === 1 || totalPages === 1}
        className="nav-button"
        onClick={() => {
          handlePageChange(1);
        }}
      >
        <ChevronsLeft />
      </button>
      <button
        disabled={currentPage === 1 || totalPages === 1}
        className="nav-button"
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
      >
        <ChevronLeft />
      </button>
      {[...Array(totalPages)].map((_, index) => {
        return (
          <button
            key={index}
            className={currentPage === index + 1 ? "btn-active" : ""}
            onClick={() => {
              handlePageChange(index + 1);
            }}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages || totalPages === 1}
        className="nav-button"
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
      >
        <ChevronRight />
      </button>
      <button
        disabled={currentPage === totalPages || totalPages === 1}
        className="nav-button"
        onClick={() => {
          handlePageChange(totalPages);
        }}
      >
        <ChevronsRight />
      </button>
    </div>
  );
};

export default RenderPaginationButtons;
