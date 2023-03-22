import { Fragment } from "react";

/**
 * @param setPlanet callback to pass data from child (SearchResults) to parent (PlanetForm)
 * @param data
 * @returns displays the search results
 */
function SearchResults({ data, setPlanet }) {
  const clickHandler = (item) => {
    // pass data (setPlanet) from child (SearchResults) to parent (PlanetForm)
    setPlanet(item); // callback function
  };
  return (
    <Fragment>
      <div id="searchResults">
        <ul>
          {data.length > 0 &&
            data.map((item, i) => (
              <li key={item.name} onClick={(e) => clickHandler(item)}>
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default SearchResults;
