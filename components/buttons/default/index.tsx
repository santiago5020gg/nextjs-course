import { ReactNode } from "react";

export default function CustomButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <>
      <button
        className="bg-[purple] text-white font-bold mt-auto"
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
