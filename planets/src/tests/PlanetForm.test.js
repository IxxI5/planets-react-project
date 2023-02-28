import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PlanetForm from "../components/PlanetForm";
import { planets } from "../data/planets.json";

/* Arrange */
/* render components */
render(<PlanetForm />);
render(
  <p data-testid="id1" hidden>
    nothing
  </p>
);

/* query components from the virtual DOM */
const button = screen.getByText("Submit");
const textboxes = Array.from(screen.getAllByRole("textbox"));
const p = screen.getByTestId("id1"); // helping hidden component for testing purposes

// test data
const planet = planets[0];
delete planet.id;

/* inputs test */
textboxes.forEach((textbox, index) => {
  let planetKey = Object.keys(planet)[index];
  let planetValue = Object.values(planet)[index];

  if (planetKey === "residents") {
    let residents = "";

    Object.values(planet)[index].forEach((item) => {
      residents += `${item}\n`;
    });

    planetValue = residents;
  }

  test(`(${index}) | tag: ${textbox.tagName} | type: ${textbox.type}`, () => {
    // Act
    fireEvent.change(textbox, { target: { value: planetValue } });

    // Assert
    expect(textbox.value).toBe(planetValue);
  });
});

/* button test */
test(`(0) | tag: ${button.tagName} | type: ${button.type}`, async () => {
  const detail = {
    action: "clicked",
    // planet, // optional or better directly from the values in form e.g. textboxes[0].value, textboxes[1].value ...
  };

  // create the custom event
  var event = new CustomEvent("simClick", {
    detail,
  });

  // p element listens when the custom event raises from the button click
  p.addEventListener(
    "simClick",
    (e) => (p.innerText = `${Object.values(detail)}`)
  );

  // Act
  fireEvent.click(button, p.dispatchEvent(event)); // on button click, dispatch (direct) the event on p element

  // Assert
  await waitFor(() =>
    expect(p.innerText).toBe(Object.values(detail).join(","))
  );
});
