import React from "react";

const FilterButton = ({ name, isPressed, setFilter }) => {
  return (
    <button
      type="button"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
      <div className="line" />
    </button>
  );
};

export default FilterButton;
