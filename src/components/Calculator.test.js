import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

// Test for rendering the calculator component
test("renders calculator correctly", () => {
  render(<Calculator />);
  expect(screen.getByText(/Material Design Calculator/i)).toBeInTheDocument();
});

// Test for performing basic addition
test("performs addition correctly", () => {
  render(<Calculator />);
  
  const input = screen.getByPlaceholderText(/Enter expression/i);
  const calculateButton = screen.getByText(/Calculate/i);

  fireEvent.change(input, { target: { value: "2+3" } });
  fireEvent.click(calculateButton);

  expect(screen.getByText(/Result: 5/i)).toBeInTheDocument();
});


// Test for performing a scientific operation (square root)
test("performs square root calculation", () => {
  render(<Calculator />);
  
  const input = screen.getByPlaceholderText(/Enter expression/i);
  const calculateButton = screen.getByText(/Calculate/i);

  fireEvent.change(input, { target: { value: "Math.sqrt(16)" } });
  fireEvent.click(calculateButton);

  expect(screen.getByText(/Result: 4/i)).toBeInTheDocument();
});

// Test for calculation history
test("adds to calculation history", () => {
  render(<Calculator />);
  
  const input = screen.getByPlaceholderText(/Enter expression/i);
  const calculateButton = screen.getByText(/Calculate/i);

  fireEvent.change(input, { target: { value: "10-4" } });
  fireEvent.click(calculateButton);

  expect(screen.getByText(/10-4 = 6/i)).toBeInTheDocument();
});

// Test for formula library links
test("renders formula library", () => {
  render(<Calculator />);
  
  expect(screen.getByText(/CIRCLE AREA/i)).toBeInTheDocument();
  expect(screen.getByText(/RECTANGLE PERIMETER/i)).toBeInTheDocument();
});
