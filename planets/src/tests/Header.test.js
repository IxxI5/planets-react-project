import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
