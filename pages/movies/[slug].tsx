import { GetStaticProps } from "next";
import { MovieDesign } from "../../components/movies/movie";
import { MoviesConstant } from "../../constants/movies";
import { Movie } from "../../models/interfaces/movie";
import { useRouter } from "next/router";

type MovieDetail = Movie & { description: string };

const MovieBySlug = ({ movie }: { movie: MovieDetail }) => {
  const router = useRouter();
  if (!movie) {
    router.push("/404");
  }
  return (
    <MovieDesign
      img={movie.img}
      title={movie.title}
      description={movie.description}
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

export const getStaticProps: GetStaticProps | null = async (context) => {
  const slug = context.params?.slug;
  const movie = MoviesConstant.find(
    (elem) => elem.id === slug && elem.enable === true
  );
  return {
    props: movie ? { movie } : { movie: null },
    revalidate: 10
  };
};

export default MovieBySlug;
