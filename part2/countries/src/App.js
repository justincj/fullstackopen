import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const baseURL = "https://restcountries.eu/rest/v2/all";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(baseURL).then((response) => {
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
