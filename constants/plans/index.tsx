import { Plan } from "../../models/interfaces/plans";
import PlansJson from "../plans/index.json"

export const PlansConstant: Plan[] = PlansJson as unknown as Plan[];
