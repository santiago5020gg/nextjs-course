import React, { ReactNode, useState } from "react";

export type TypePlan = "Estándar" | "Móvil" | null;

export type PricePlan = {
  type: TypePlan;
  price: string | null;
};

export type PlanPriceProps = PricePlan & {
  setPlanPrice: (value: PricePlan) => void;
  numberClicks: number
};

export const PlanContext = React.createContext<PlanPriceProps | null>(null);

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [numberClicks, setNumberClicks] = useState(0);
  const [planState, setPlanState] = useState<PricePlan>({
    price: null,
    type: null
  });


  const setPlanPrice = (value: PricePlan) => {
    if(value.type === 'Móvil'){
      setNumberClicks(numberClicks + 1);
    }
    setPlanState(value);
  };

  return (
    <PlanContext.Provider
      value={{
        ...planState,
        numberClicks,
        setPlanPrice,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
