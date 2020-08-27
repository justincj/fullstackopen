import React, { useState } from "react";
import Country from "./Country";
const List = ({ countries }) => {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");

  const handleClick = (country) => {
    setCountry(country);
    setShow(!show);
  };
  if (show) {
    return <Country country={country} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          <p>{country.name}</p>
          <button onClick={() => handleClick(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default List;
