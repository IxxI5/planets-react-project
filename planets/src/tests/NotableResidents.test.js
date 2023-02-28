import "@testing-library/jest-dom"; // pre-requisite: npm i jest-dom
import renderer from "react-test-renderer"; // pre-requisite: npm i react-test-renderer
import { FaMale } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa";
import NotableResidents from "../components/NotableResidents";
import { planets } from "../data/planets.json";

// test data
const planet = planets[0];
delete planet.id;

// data fromatting => remove gender text
let person1 = Object.values(planet.residents[0]);
let person2 = Object.values(planet.residents[1]);
person1.pop(); // remove gender text value
person2.pop(); // remove gender text value

/* helping component */
function TD() {
  // Render the component to resolve the Error "Functions are not valid as a React child"
  //   Case 3: https://bobbyhadz.com/blog/react-functions-are-not-valid-as-react-child
  const Ps = () => {
    return (
      <>
        <p>
          <FaMale /> {person1.join(", ")}
        </p>
        <p>
          <FaGenderless /> {person2.join(", ")}
        </p>
      </>
    );
  };

  return <Ps />;
}

/* rendering tests using MatchSnapshot */
test(`(0) | create a reference snapshot`, () => {
  /* Arrange */
  /* render components plus Act -> JSON*/
  const ref = renderer.create(<NotableResidents planet={planet} />).toJSON();

  /* Assert */
  expect(ref).toMatchSnapshot();
});

/* compare rendered helping component with the snapshot */
test(`(1) | compare helping component with the reference snapshot`, () => {
  /* Arrange */
  /* render components plus Act -> JSON*/
  const comp = renderer.create(<TD />).toJSON();

  /* Assert */
  expect(comp).toMatchSnapshot();
});
