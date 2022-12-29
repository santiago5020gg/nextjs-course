import { render, screen } from "@testing-library/react";
import Home from "./index";
import "@testing-library/jest-dom";
const { MongoClient } = require("mongodb");

describe("Home", () => {
  jest.mock(MongoClient);
  it("renders a heading", () => {
    render(<Home />);
    const contactElement = screen.getByText(/contactenos/i);
    expect(contactElement).toBeInTheDocument();
  });
});
