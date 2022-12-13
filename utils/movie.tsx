import { getMoviesFromMongoDb } from "../lib/mongodb/movie";
import { Movie } from "../models/interfaces/movie";
import { IsMovieArray } from "../models/typeGuards/movie";

export const getEnabledMovies = (allMovies: Movie[]): Movie[] => {
  try {
    return allMovies.filter((elem) => elem.enable === true);
  } catch (error) {
    console.log('llego aqui');
    return [];
  }
};

export const getAllMovies = async (): Promise<any> => {
  try {
    const findResult = await getMoviesFromMongoDb();
    if (!IsMovieArray(findResult)) {
      return [];
    }
    return findResult.map((elem) => ({
      id: elem.id,
      title: elem.title,
      img: elem.img,
      enable: elem.enable,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};