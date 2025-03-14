import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Calculator from "./components/Calculator";

test("renders calculator", () => {
  render(<App />);
  expect(screen.getByText(/Material Design Calculator/i)).toBeInTheDocument();
});

test("performs addition correctly", () => {
  render(<Calculator />);
  
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("="));

  expect(screen.getByDisplayValue("5")).toBeInTheDocument();
});

test("clears input when C is pressed", () => {
  render(<Calculator />);
  
  fireEvent.click(screen.getByText("5"));
  fireEvent.click(screen.getByText("C"));

  expect(screen.getByDisplayValue("")).toBeInTheDocument();
});
