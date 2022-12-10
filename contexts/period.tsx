import React, { ReactNode, useState } from "react";

export type TypePrice = "mes" | "anual";

type PeriodProps = {
  type: TypePrice;
  price: string;
  setType: (value: TypePrice) => void;
  setPrice: (value: string) => void;
};

export const PeriodContext = React.createContext<PeriodProps | null>(null);

const PeriodProvider = ({ children }: { children: ReactNode }) => {
  const [priceState, setPriceState] = useState("");
  const [typeState, setTypeState] = useState<TypePrice>("mes");

  const setType = (value: TypePrice) => {
    setTypeState(value);
  };

  const setPrice = (value: string) => {
    setPriceState(value);
  };

  return (
    <PeriodContext.Provider
      value={{ price: priceState, type: typeState, setType, setPrice }}
    >
      {children}
    </PeriodContext.Provider>
  );
};

export default PeriodProvider;