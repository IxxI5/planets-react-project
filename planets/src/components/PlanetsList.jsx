import Planet from "./Planet";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaArrowsAltV } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { sortByProperty } from "../methods/methods";

// npm install react-icons
// https://react-icons.github.io/react-icons/icons?name=fa
// https://react-icons.github.io/react-icons/search?q=caret

/**
 * Displays a table of planets and their properties
 * @param {string} planets: list of objects
 */
export default function PlanetsList({ planets, setPlanets }) {
  const [toggle, setToggle] = useState(undefined);
  const [thName, setThName] = useState("diameter");

  // on click read just the planet object within the table
  const onClickHandler = (item) => {
    if (item.hasOwnProperty("gravity") === false) {
      item = null;
    }

    console.log(item);
  };

  // on toggle change, trigger component re-rendering
  useEffect(() => {
    let sortedPlanets = sortByProperty(thName, toggle, planets);

    setPlanets([...sortedPlanets]); // should be [...sortedPlanets] (in sync) and not ...sortedPlanets (becomes out of sync)

    console.log(toggle, planets);
  }, [toggle]);

  // toggle over three states: undefined -> true -> false -> undefined
  let toggleSort = (property) => {
    setThName(property);

    switch (toggle) {
      case true:
        setToggle(false);
        break;
      case false:
        setToggle(undefined);
        break;
      // togglee = undefined
      default:
        setToggle(true);
    }
  };

  // A three state Functional Component
  function ToggleComponent(toggle) {
    switch (toggle) {
      case true:
        return <FaCaretUp />;

      case false:
        return <FaCaretDown />;

      default:
        return <FaArrowsAltV />;
    }
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")}>
              Name {thName === "name" && ToggleComponent(toggle)}
            </th>
            <th onClick={() => toggleSort("diameter")}>
              Diameter {thName === "diameter" && ToggleComponent(toggle)}
            </th>
            <th onClick={() => toggleSort("gravity")}>
              Gravity {thName === "gravity" && ToggleComponent(toggle)}
            </th>
            <th onClick={() => toggleSort("terrain")}>
              Terrain {thName === "terrain" && ToggleComponent(toggle)}
            </th>
            <th onClick={() => toggleSort("population")}>
              Population {thName === "population" && ToggleComponent(toggle)}
            </th>
            <th>Notable Residents</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, i) => (
            <tr key={planet.name} onClick={() => onClickHandler(planet)}>
              <Planet planet={planet} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
