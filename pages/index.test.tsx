import { render, screen } from "@testing-library/react";
import Home from "./index";
import {Movie} from '../models/interfaces/movie';
import {HeroType} from '../models/interfaces/hero';
import { MoviesConstant } from '../constants/movies/index';
import { HeroConstant } from "../constants/hero";
import { setupWorker, rest } from 'msw';

const movieListMock: Movie[] = MoviesConstant;
const heroMock: HeroType = HeroConstant;

beforeAll(() => {
  render(<Home moviesList={movieListMock} hero={heroMock} />);
});

describe("Home", () => {
  it("should renders show all plans", () => {
    const contactElement = screen.getByText(/show all plans/i);
    expect(contactElement).toBeInTheDocument();
  });
});
