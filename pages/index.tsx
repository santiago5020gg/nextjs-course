import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Hero } from "../components/home-page/hero";
import { Plans } from "../components/home-page/plans";
import { Movies } from "../components/movies";
import PlanProvider from "../contexts/plans";
import { HeroType } from "../models/interfaces/hero";
import { Movie } from "../models/interfaces/movie";
import { Plan } from "../models/interfaces/plans";
import { getEnabledMovies } from "../utils/movie";

const Home = ({
  plansList,
  moviesList,
  hero,
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
        <PlanProvider>
          <Hero price={hero.price} description={hero.description} />
          <Plans plans={plansList} />
          <Link href="/all-plans">Show all Plans</Link>
          <Movies movies={moviesList} />
        </PlanProvider>
      </div>
    </div>
  );
};

const getAllMovies = async () => {
  try {
    const response = await fetch(`${process.env.DB_HOST}/api/movies`);
    if (!response.ok) {
      throw new Error("Something went wrong ");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const getInitPlans = async () => {
  try {
    const response = await fetch(`${process.env.DB_HOST}/api/plans/2`);
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
    const response = await fetch(`${process.env.DB_HOST}/api/hero`);
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
  const allMovies: Movie[] = await getAllMovies();
  const allPlans = await getInitPlans();
  const hero = await getHero();
  const moviesFilter: Movie[] = getEnabledMovies(allMovies);
  return {
    props: {
      plansList: allPlans,
      moviesList: moviesFilter,
      hero,
    },
    revalidate: 10,
  };
}

export default Home;
