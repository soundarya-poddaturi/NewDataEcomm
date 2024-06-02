// src/FilterCollapse.js
import React from "react";
import { Button, Collapse } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import "./style.css"
const FilterCollapse = ({
  title,
  items,
  selectedItems = [],
  onChange,
  showFilter,
  setShowFilter,
  clearFilter,
  customComponent // Accept customComponent as a prop
}) => {
  const handleStarClick = (index) => {
    onChange(index + 1);
  };

  return (
    <div className="mb-3">
      <div
        className="d-flex align-items-center justify-content-around"
        onClick={() => setShowFilter(!showFilter)}
      >
        <Button
          aria-controls={`${title.toLowerCase()}Filter`}
          aria-expanded={showFilter}
          variant="link"
          className="p-0 mb-2 fw-semibold mb-1 p-0 text-black text-decoration-none me-4"
        >
          {title.toUpperCase()}
        </Button>
        <span
          className={`fa ${showFilter ? "fa-caret-up" : "fa-caret-down"}`}
        ></span>
      </div>

      <Collapse in={showFilter}>
        <div id={`${title.toLowerCase()}Filter`} className="filter-collapse-content my-3 px-5">
          {title.toLowerCase() === "rating" && (
            <div className="d-flex align-items-center justify-content-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={selectedItems >= index + 1 ? "text-warning me-1 fa-lg" : " me-1 fa-lg"}
                  onClick={() => handleStarClick(index)}
                />
              ))}& up
            </div>
          )}
          {title.toLowerCase() !== "rating" && !customComponent && (
            <>
              {items.map((item, index) => (
                <div key={index} className="form-check ">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id={`${title}${index}`}
                    checked={selectedItems.includes(item)}
                    onChange={() => onChange(item)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${title}${index}`}
                  >
                    {item}
                  </label>
                </div>
              ))}
            </>
          )}
          {customComponent && customComponent}
          <Button
            variant="link"
            className="text-body-emphasis p-1 rounded-0 btn-sm mt-2"
            onClick={clearFilter}
          >
            Clear {title}
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterCollapse;
