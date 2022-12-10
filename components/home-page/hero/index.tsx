import { useContext } from "react";
import { PeriodContext, TypePrice } from "../../../contexts/period";
import { PlanContext, TypePlan } from "../../../contexts/plans";
import { HeroType } from "../../../models/interfaces/hero";

export const Hero = ({ price, description }: HeroType) => {
  const planContext = useContext(PlanContext);
  const periodContext = useContext(PeriodContext);

  const setPeriod = (value: TypePrice | undefined): void => {
    if (!value) {
      return;
    }
    if (value === "mes") {
      periodContext?.setType("anual");
    } else {
      periodContext?.setType("mes");
    }
  };

  const setPrice = (value: string) => {
    periodContext?.setPrice(value);
  };

  const Price = () => {
    return (
      <div>
        <span
          className="cursor-pointer"
          onClick={() => setPrice("Te quedo gratis. Precios locos")}
        >
          {" "}
          {periodContext?.price ? periodContext?.price : price}{" "}
        </span>
        /
        <span
          className="cursor-pointer"
          onClick={() => setPeriod(periodContext?.type)}
        >
          {periodContext?.type}
        </span>
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
