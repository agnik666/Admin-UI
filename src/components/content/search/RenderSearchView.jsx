import "./SearchView.css";

const RenderSearchView = ({ handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, email or role"
      className="search-input"
      onChange={(event) => {
        handleSearch(event.target.value);
      }}
    />
  );
};

export default RenderSearchView;
