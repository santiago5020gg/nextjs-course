import { Plans } from "../../components/home-page/plans";
import { Plan } from "../../models/interfaces/plans";

const getAllPlans = async () => {
  try {
    const response = await fetch(`${process.env.DB_HOST}/api/plans/all`);
    if (!response.ok) {
      throw new Error("Something went wrong ");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const AllPlans = ({ plansList }: { plansList: Plan[] }) => {
  return <Plans plans={plansList} />;
};

export async function getServerSideProps() {
  const allPlans = await getAllPlans();
  return {
    props: {
      plansList: allPlans,
    },
  };
}

export default AllPlans;
