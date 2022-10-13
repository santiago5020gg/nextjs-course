import { Plan } from "../../../../models/interfaces/plans";
import CustomButton from "../../../buttons/default";

export const PlanDesign = ({ plan }: { plan: Plan }) => {
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex">
          <div>{plan.title}</div>
          <div>${plan.price}/mes</div>
        </div>
        <div className="flex flex-col gap-x-1">
          {plan.benefits.map((elem, index) => (
            <div key={index}>+ {elem}.</div>
          ))}
        </div>
        <CustomButton>Elige plan {plan.title}</CustomButton>
      </div>
    </>
  );
};
