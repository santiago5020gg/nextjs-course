import { Plan } from "../../models/interfaces/plans";
import PlansJson from "../plans/index.json";
import AllPlansJson from "../plans/allPlans.json";

export const PlansConstant: Plan[] = PlansJson as unknown as Plan[];
export const AllPlansContant: Plan[] = AllPlansJson  as unknown as Plan[];
