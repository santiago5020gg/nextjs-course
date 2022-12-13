import { Plan } from "../interfaces/plans";

export const isPlan = (plan: any): plan is Plan => {
  return (plan as Plan) && !!(plan as Plan).id;
};
