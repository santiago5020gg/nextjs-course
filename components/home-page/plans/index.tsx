import { Plan } from "../../../models/interfaces/plans";
import { PlanDesign } from "./plan";

export const Plans = ({ plans }: { plans: Plan[] | null | undefined }) => {
  if (!plans) {
    return <div>...Loading</div>;
  }
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
