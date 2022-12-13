import { GetStaticProps } from "next";
import { MovieDesign } from "../../components/movies/movie";
import { getMoviesFromMongoDb } from "../../lib/mongodb/movie";
import { Movie } from "../../models/interfaces/movie";
import connectMongoDb from "../../models/services/mongodb/config";
import { IsMovieArray } from "../../models/typeGuards/movie";

type MovieDetail = Movie & { description: string };

const MovieBySlug = ({ movie }: { movie: MovieDetail }) => {
  return (
    <MovieDesign
      img={movie.img}
      title={movie.title}
      description={movie.description}
      id={movie.id}
    />
  );
};

export async function getStaticPaths() {
  const movies = await getMoviesFromMongoDb();
  let paths = [
    {
      params: { slug: "1" },
    },
  ];
  if (!IsMovieArray(movies)) {
  } else {
    paths = movies.slice(0, 2).map((elem) => ({
      params: { slug: elem.id },
    }));
  }

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
}

const getAllMovies = async () => {
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

export const getStaticProps: GetStaticProps | null = async (context) => {
  const slug = context.params?.slug;
  const allMovies: Movie[] = await getAllMovies();
  const movie = allMovies.find(
    (elem) => elem.id === slug && elem.enable === true
  );
  if (!movie) {
    return {
      notFound: true,
    };
  }
  return {
    props: { movie },
    revalidate: 10,
  };
};

export default MovieBySlug;
