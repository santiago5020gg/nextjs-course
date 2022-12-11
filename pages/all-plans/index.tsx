import { Plans } from "../../components/home-page/plans";
import { Plan } from "../../models/interfaces/plans";

const getAllPlans = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/plans/all`);
    if (!response.ok) {
      return Promise.reject(response);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log("Something went wrong.", error);
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
