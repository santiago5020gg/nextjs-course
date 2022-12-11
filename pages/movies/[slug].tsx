import { GetStaticProps } from "next";
import { MovieDesign } from "../../components/movies/movie";
import { MoviesConstant } from "../../constants/movies";
import { Movie } from "../../models/interfaces/movie";

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
  const paths = MoviesConstant.slice(0, 2).map((elem) => ({
    params: { slug: elem.id },
  }));
  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
}

const getAllMovies = async () => {
  try {
    const response = await fetch(`https://${process.env.API_URL}/api/movies`);
    if (!response.ok) {
      console.log('getAllMovies response.ok');
      const text = await response.text();
      throw new Error(text);
    }
    console.log('El response getAllMovies',response);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log("Something went wrong. getAllMovies", error);
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
