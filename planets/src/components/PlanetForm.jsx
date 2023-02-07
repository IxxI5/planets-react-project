import { useState } from "react";
import model from "../models/model";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || planets.some((item) => item.name === name)) {
      alert(`Error! Planet already exists or no name is entered`);

      return;
    }

    let planet = { ...model.planet };
    let resident = { ...model.resident };
    let enteredResidents = [...residents.split("\n")];

    planet.id = planets.length;
    planet.name = name;
    planet.diameter = diameter;
    planet.gravity = gravity;
    planet.terrain = terrain;
    planet.population = population;

    enteredResidents.forEach((item) => {
      let [name, height, birth_year, gender] = item.split(",");

      // undefined or null check and then set resident object
      name = name ?? "unknown";
      height = height ?? "unknown";
      birth_year = birth_year ?? "unknown";
      gender = gender ?? "unknown";

      resident.name = name;
      resident.height = height.replace(/\s/g, "");
      resident.birth_year = birth_year.replace(/\s/g, "");
      resident.gender = gender.replace(/\s/g, "");

      planet.residents.push(resident);

      resident = {};
    });

    setPlanets([...planets, planet]);

    console.log(planet);
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
