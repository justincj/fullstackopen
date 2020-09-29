import React from "react";
import { useDispatch } from "react-redux";
import { search } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    console.log(e);
    const query = e.target.value;
    return dispatch(search(query));
  };

  return (
    <div>
      filter <input name="query" onChange={searchHandler} />
    </div>
  );
};

export default Filter;
