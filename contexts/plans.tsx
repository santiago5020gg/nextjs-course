import React, { ReactNode, useState } from "react";

export type TypePlan = "Estándar" | "Móvil" | null;

export type PricePlan = {
  type: TypePlan;
  price: string | null;
};

export type PlanPriceProps = PricePlan & {
  setPlanPrice: (value: PricePlan) => void;
};

export const PlanContext = React.createContext<PlanPriceProps | null>(null);

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [planState, setPlanState] = useState<PricePlan>({
    price: null,
    type: null,
  });

  const setPlanPrice = (value: PricePlan) => setPlanState(value);

  return (
    <PlanContext.Provider
      value={{
        ...planState,
        setPlanPrice,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;
