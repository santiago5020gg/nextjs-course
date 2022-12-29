import { render, screen } from "@testing-library/react";
import Home from "./index";
import { Movie } from "../models/interfaces/movie";
import { HeroType } from "../models/interfaces/hero";
import { Plan } from "../models/interfaces/plans";
import { MoviesConstant } from "../constants/movies/index";
import { HeroConstant } from "../constants/hero";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { PlansConstant } from "../constants/plans";

const movieListMock: Movie[] = MoviesConstant;
const heroMock: HeroType = HeroConstant;
const plansMock: Plan[] = PlansConstant;

const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!
  rest.get("/api/plans/2", (req, res, ctx) => {
    return res(ctx.json(plansMock));
  })
);


beforeAll(() => {
  server.listen();
});


afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Home", () => {
  beforeAll(() => {
    render(<Home moviesList={movieListMock} hero={heroMock} />);
  });

  it("should renders show all plans", () => {
    const contactElement = screen.getByText(/show all plans/i);
    expect(contactElement).toBeInTheDocument();
  });
});
