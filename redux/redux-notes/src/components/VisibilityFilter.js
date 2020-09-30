import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      all{" "}
      <input
        onChange={() => dispatch(filterChange("ALL"))}
        name="filter"
        type="radio"
      />
      important{" "}
      <input
        onChange={() => dispatch(filterChange("IMPORTANT"))}
        name="filter"
        type="radio"
      />
      nonimportant{" "}
      <input
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
        name="filter"
        type="radio"
      />
    </div>
  );
};

export default VisibilityFilter;
