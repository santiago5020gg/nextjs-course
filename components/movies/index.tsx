import { Movie } from "../../models/interfaces/movie";
import { MovieDesign } from "./movie";

export const Movies = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="flex gap-x-3">
      {movies.map((elem) => (
        <MovieDesign img={elem.img} title={elem.title} key={elem.id} />
      ))}
    </div>
  );
};
