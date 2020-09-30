import React from "react";
import { connect } from "react-redux";
import { search } from "../reducers/filterReducer";

const Filter = (props) => {
  const searchHandler = (e) => {
    console.log(e);
    const query = e.target.value;
    return props.search(query);
  };

  return (
    <div>
      filter <input name="query" onChange={searchHandler} />
    </div>
  );
};

export default connect(null, { search })(Filter);
