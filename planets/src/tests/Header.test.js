import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

// Arrange
/* render components */
render(<Header />);

/* query components from the virtual DOM */
const h1 = screen.getByRole("heading");

// heading test
test(`(0) | tag: ${h1.tagName} | type: ${h1.type}`, () => {
  // Act: h1 is already set

  // Assert
  expect(h1.innerHTML).toBe("Planets Archive");
});

/*
Notes
-----
toBeInTheDocument() -> requires to install : npm i --save-dev @testing-library/jest-dom
Link: https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function

minimum inports for react-testing:
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

package.json:
With watchAll=false the test exits after running:
"test": "react-scripts test --watchAll=false",
"test:coverage": "react-scripts test --env=jsdom --watchAll=false --coverage",

React end to end testing with Jest and Puppeteer (Browser Launch)
Link: https://blog.logrocket.com/end-to-end-testing-react-jest-puppeteer/

React Testing Library Tutorial – How to Write Unit Tests for React Apps with Bootstrap (ready components):
Link: https://www.freecodecamp.org/news/write-unit-tests-using-react-testing-library/
*/
