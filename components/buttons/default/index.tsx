import { ReactNode } from "react";

export default function CustomButton({
  children,
  onClick,
  className,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string | undefined;
  disabled?: boolean;
}) {
  return (
    <>
      <button
        className={`bg-[purple] text-white font-bold mt-auto ${className}`}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
