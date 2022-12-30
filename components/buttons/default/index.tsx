import { ReactNode } from "react";

export default function CustomButton({
  children,
  onClick,
  disabled
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <>
      <button
        className="bg-[purple] text-white font-bold mt-auto"
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
