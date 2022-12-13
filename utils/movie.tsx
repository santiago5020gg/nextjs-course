import { Movie } from "../models/interfaces/movie";

export const getEnabledMovies = (allMovies: Movie[]): Movie[] => {
  try {
    console.log('esta bueno');
    return allMovies.filter((elem) => elem.enable === true);
  } catch (error) {
    console.log('llego aqui');
    return [];
  }
};
