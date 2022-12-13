import { Movie } from "../interfaces/movie";

/** Custom Type Guard */
export const IsMovieArray = (movies: any): movies is Movie[] => {
  let res_ =
    (movies as Movie[]) &&
    (movies as Movie[]).length >= 0 &&
    !!(movies as Movie[])[0].id;
  return res_;
};
