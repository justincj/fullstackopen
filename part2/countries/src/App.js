import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "https://restcountries.eu/rest/v2/all";

const Countries = ({ countries, search }) => {
  countries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(search.toLowerCase())
  );
  console.log(countries);
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    let country = countries[0];
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <p>
          <img src={`${country.flag}`} alt="flag" height="250px" />
        </p>
      </div>
    );
  } else {
    return countries.map((country) => <p key={country.name}>{country.name}</p>);
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data[0]);
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      Find countries
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {search ? <Countries countries={countries} search={search} /> : <p></p>}
    </div>
  );
};

export default App;
