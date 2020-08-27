import React from "react";
import Country from "./Country";
import List from "./List";

const Countries = ({ countries, search }) => {
  countries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(search.toLowerCase())
  );
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <List countries={countries} />;
  }
};

export default Countries;
