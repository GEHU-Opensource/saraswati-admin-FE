const SearchBar = ({ value, onChange }) => {
    return (
      <div>
      <input
        type="text"
        placeholder="Search"
        className=" rounded-md p-2 text-black bg-white"
        value={value}
        onChange={onChange}
      />
      </div>
    );
  };
  
  export default SearchBar;
  