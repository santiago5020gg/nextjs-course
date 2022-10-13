import { ReactNode } from "react";

export default function CustomButton({ children }: { children: ReactNode }) {
  return (
    <>
      <button className="bg-[purple] text-white font-bold mt-auto" type="button">{children}</button>
    </>
  );
}
