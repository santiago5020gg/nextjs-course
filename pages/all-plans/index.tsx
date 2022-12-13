import { useEffect, useState } from "react";
import { Plans } from "../../components/home-page/plans";
import { Plan } from "../../models/interfaces/plans";



const AllPlans = () => {

  const [plansList, setPlansList] = useState();

  const getAllPlans = async () => {
    try {
      const response = await fetch(`/api/plans/all`);
      if (!response.ok) {
        console.log("getAllPlans response.ok");
        const text = await response.text();
        throw new Error(text);
      }
      const jsonData = await response.json();
      setPlansList(jsonData);
      return jsonData;
    } catch (error) {
      console.log("Something went wrong. getAllPlans", error);
    }
  };

  useEffect(() => {
    getAllPlans();
  },[])

  return <Plans plans={plansList} />;
};


export default AllPlans;
