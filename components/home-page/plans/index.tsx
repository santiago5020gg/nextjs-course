import { Plan } from "../../../models/interfaces/plans";
import { PlanDesign } from "./plan";

export const Plans = ({ plans }: { plans: Plan[] }) => {
  return (
    <>
      <div className="flex gap-3">
        {plans.map((elem) => (
          <PlanDesign key={elem.id} plan={elem} />
        ))}
      </div>
    </>
  );
};
