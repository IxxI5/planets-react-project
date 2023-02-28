import renderer from "react-test-renderer"; // pre-requisite: npm i react-test-renderer
import NotableResidents from "../components/NotableResidents";
import Planet from "../components/Planet";
import { planets } from "../data/planets.json";

// test data
const planet = planets[0];
delete planet.id;

/* helping component */
function TR() {
  // Render the component to resolve the Error "Functions are not valid as a React child"
  //   Case 3: https://bobbyhadz.com/blog/react-functions-are-not-valid-as-react-child
  const Trow = () => {
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
  };

  return <Trow />;
}

/* rendering tests using MatchSnapshot */
test(`(0) | create a reference snapshot`, () => {
  /* Arrange */
  /* render components plus Act -> JSON*/
  const ref = renderer.create(<Planet planet={planet} />).toJSON();

  /* Assert */
  expect(ref).toMatchSnapshot();
});

/* compare rendered helping component with the snapshot */
test(`(1) | compare helping component with the reference snapshot`, () => {
  /* Arrange */
  /* render components plus Act -> JSON*/
  const comp = renderer.create(<TR />).toJSON();

  /* Assert */
  expect(comp).toMatchSnapshot();
});
