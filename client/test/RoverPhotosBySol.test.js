// RoverPhotosBySol.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import RoverPhotosBySol from "../RoverPhotosBySol"; // Correct import path

test("renders RoverPhotosBySol component", () => {
  render(<RoverPhotosBySol />);

  // Check if the component renders correctly
  expect(screen.getByText("Mars Rover Photos")).toBeInTheDocument();
});

test("search button works correctly", () => {
  render(<RoverPhotosBySol />);

  // Mocking user input
  fireEvent.change(screen.getByLabelText("Sol:"), {
    target: { value: "1000" },
  });
  fireEvent.click(screen.getByText("Search"));

  // Assert if the search functionality works correctly
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
