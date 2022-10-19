import type { NextPage } from "next";
import Head from "next/head";
import { Hero } from "../components/home-page/hero";
import { Plans } from "../components/home-page/plans";
import { Movies } from "../components/movies";
import { HeroType } from "../models/interfaces/hero";
import { Movie } from "../models/interfaces/movie";
import { Plan } from "../models/interfaces/plans";

const Home = ({
  plansList,
  moviesList,
  hero
}: {
  plansList: Plan[];
  moviesList: Movie[];
  hero: HeroType;
}) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-y-14">
        <Hero price={hero.price} description={hero.description} />
        <Plans plans={plansList} />
        <Movies movies={moviesList} />
      </div>
    </div>
  );
};

const getAllMovies = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/movies");
    if (!response.ok) {
      throw new Error("Something went wrong ");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const getAllPlans = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/plans");
    if (!response.ok) {
      throw new Error("Something went wrong ");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const getHero = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/hero");
    if (!response.ok) {
      throw new Error("Something went wrong ");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

export async function getStaticProps() {
  const allMovies = await getAllMovies();
  const allPlans = await getAllPlans();
  const hero = await getHero();
  return {
    props: {
      plansList: allPlans,
      moviesList: allMovies,
      hero
    },
    revalidate: 10,
  };
}

export default Home;
