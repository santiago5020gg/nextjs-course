import { useContext } from "react";
import { PeriodContext } from "../../../../contexts/period";
import { PlanContext, PricePlan } from "../../../../contexts/plans";
import { Plan } from "../../../../models/interfaces/plans";
import CustomButton from "../../../buttons/default";

export const PlanDesign = ({ plan }: { plan: Plan }) => {
  const planContext = useContext(PlanContext);
  const periodContext = useContext(PeriodContext);

  const setPlan = (plan: PricePlan) => {
    planContext?.setPlanPrice(plan);
  };

  return (
    <>
      <div
        className={`flex flex-col gap-y-5 ${
          planContext?.type === plan.title && "bg-gray-200"
        }`}
      >
        <div className="flex">
          <div>{plan.title}</div>
          <div>
            ${plan.price}/{periodContext?.type}
          </div>
        </div>
        <div className="flex flex-col gap-x-1">
          {plan.benefits.map((elem, index) => (
            <div key={index}>+ {elem}.</div>
          ))}
        </div>
        <CustomButton
          onClick={() => setPlan({ price: plan.price, type: plan.title })}
        >
          Elige plan {plan.title}
        </CustomButton>
      </div>
    </>
  );
};
