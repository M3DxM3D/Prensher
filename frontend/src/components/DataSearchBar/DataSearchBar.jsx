import React from "react";
import propTypes from "prop-types";
import "./DataSearchBar.scss";

export default function DataSearchBar({
  setSearchTerm,
  searchTerm,
  placeholderText,
  data, // Assuming you have the data to filter
}) {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the data based on the searchTerm
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="input-search-bar">
      <p>Quel objet souhaitez-vous emprunter?</p>
      <div className="input">
        <i className="fi fi-rr-search" />
        <input
          type="text"
          className="input-search-bar"
          placeholder={placeholderText}
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {/* Display the filtered data */}
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

DataSearchBar.propTypes = {
  setSearchTerm: propTypes.func,
  searchTerm: propTypes.string,
  placeholderText: propTypes.string,
  data: propTypes.array, // Add the data prop for filtering
};

DataSearchBar.defaultProps = {
  searchTerm: "",
  setSearchTerm: () => {},
  placeholderText: "Recherche",
  data: [], // Default empty array for data
};
