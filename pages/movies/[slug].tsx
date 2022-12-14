import { GetStaticProps } from "next";
import { MovieDesign } from "../../components/movies/movie";
import { getMovieByIdFromMongoDb } from "../../lib/mongodb/movie";
import { Movie } from "../../models/interfaces/movie";
import { isMovie, IsMovieArray } from "../../models/typeGuards/movie";

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

const getMovieBySlug = async (slug: string): Promise<Movie | null> => {
  try {
    const findResult = await getMovieByIdFromMongoDb(slug);
    if (!isMovie(findResult)) {
      return null;
    }
    return {
      id: findResult.id,
      title: findResult.title,
      img: findResult.img,
      enable: findResult.enable,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function getStaticPaths() {
  let paths = [
    {
      params: { slug: "1" },
    },
  ];

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps | null = async (context) => {
  const slug = context.params?.slug;
  const movie: Movie | null = await getMovieBySlug(
    typeof slug === "string" ? slug : "nothing"
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
