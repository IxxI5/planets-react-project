import NotableResidents from "./NotableResidents";

/**
 * Displays a table row of planet properties
 * @param {string} planet: single object
 */
export default function Planet({ planet }) {
  return (
    <>
      <td>{planet.name}</td>
      <td>{planet.diameter}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.population}</td>
      <NotableResidents planet={planet} />
    </>
  );
}
