import { useState, useEffect } from "react";
import { fetchData } from "../methods/methods";
import SearchResults from "./SearchResults";

/**
 * Planet Properties Form
 * @param name > Name
 * @param diameter > Diameter
 * @param gravity > Gravity
 * @param terrain > Terrain
 * @param population > Population
 * @param residents > Notable Residents
 */
export default function PlanetForm({ planets, setPlanets }) {
  const [name, setName] = useState("");
  const [diameter, setDiameter] = useState("");
  const [gravity, setGravity] = useState("");
  const [terrain, setTerrain] = useState("");
  const [population, setPopulation] = useState("");
  const [residents, setResidents] = useState("");
  const [planetsList, setPlanetsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    if (planet) {
      setName(planet.name);
      setDiameter(planet.diameter);
      setGravity(planet.gravity);
      setTerrain(planet.terrain);
      setPopulation(planet.population);
      setResidents("");

      let residents = ``;

      // fetch residents data if available
      if (planet.residents.length > 0) {
        fetchData(planet.residents).then((data) => {
          data.map((item, i) => {
            residents += `${item.name},${item.height},${item.birth_year},${
              item.gender
            }${i + 1 < data.length ? "\n" : ""}`;
          });
          setResidents(residents);
        });
      }

      setSearchResults([]);
      setPlanet(null);
    }
  }, [planet]);

  // retrieve all planets and setPlanetsList on App Launch
  useEffect(() => {
    fetchData().then((data) => {
      setPlanetsList(data);
    });
  }, []);

  // filter the planetsList dependend on name change
  useEffect(() => {
    let results = [];

    results = planetsList.filter((planet) => {
      if (planet.name.toLowerCase().startsWith(name.toLowerCase())) {
        return planet;
      }
    });

    setSearchResults(results);
  }, [name, planetsList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || planets.some((item) => item.name === name)) {
      alert(`Error! Planet already exists or no name is entered`);
      return;
    }

    let enteredResidents =
      residents.length > 0 ? [...residents.split("\n")] : [];

    let newPlanet = {
      id: planets.length,
      name: name,
      diameter: diameter,
      gravity: gravity,
      terrain: terrain,
      population: population,
      residents: [],
    };

    enteredResidents.forEach((item) => {
      let [name, height, birth_year, gender] = item.split(",");

      // undefined or null check and then set resident object
      name = name ?? "unknown";
      height = height ?? "unknown";
      birth_year = birth_year ?? "unknown";
      gender = gender ?? "unknown";

      let resident = {
        name: name,
        height: height.replace(/\s/g, ""),
        birth_year: birth_year.replace(/\s/g, ""),
        gender: gender.replace(/\s/g, ""),
      };

      newPlanet.residents.push(resident);
    });

    setPlanets([...planets, newPlanet]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter a New Planet</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Planet Name"
      />
      {searchResults.length > 0 && (
        <SearchResults data={searchResults} setPlanet={setPlanet} />
      )}
      <br />
      <input
        type="text"
        value={diameter}
        onChange={(e) => setDiameter(e.target.value)}
        placeholder="Diameter"
      />
      <br />
      <input
        type="text"
        value={gravity}
        onChange={(e) => setGravity(e.target.value)}
        placeholder="Gravity"
      />
      <br />
      <input
        type="text"
        value={terrain}
        onChange={(e) => setTerrain(e.target.value)}
        placeholder="Terrain"
      />
      <br />
      <input
        type="text"
        value={population}
        onChange={(e) => setPopulation(e.target.value)}
        placeholder="Population"
      />
      <br />
      <textarea
        value={residents}
        onChange={(e) => setResidents(e.target.value)}
        placeholder="e.g. &#10;John Baker, 175, 19BBY, male&#10;Kate Bale, 179, 19BCY, female&#10;"
        rows="5"
        cols="60"
      ></textarea>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
