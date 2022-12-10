import { useContext } from "react";
import { PlanContext } from "../../../contexts/plans";
import { HeroType } from "../../../models/interfaces/hero";

export const Hero = ({ price, description }: HeroType) => {
  const planContext = useContext(PlanContext);

  const Price = () => {
    return (
      <div>
        ${price}/mes*{" "}
        {planContext?.price && (
          <span>
            {" "}
            (Restale {planContext.price} a tu plan por escoger{" "}
            {planContext.type})
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div>{description}</div>
      <div>
        <div>Los planes empiezan desde</div>
        <Price />
      </div>
    </div>
  );
};
