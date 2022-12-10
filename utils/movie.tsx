import { Movie } from "../models/interfaces/movie";

export const getEnabledMovies = (allMovies: Movie[]) =>
  allMovies.filter((elem) => elem.enable === true);
