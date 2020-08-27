import React from "react";

const Country = ({country}) => {
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
    )
};

export default Country;
