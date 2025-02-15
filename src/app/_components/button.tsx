import { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "full" | "flat" | "naked";

export const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  },
) => {
  const { variant = "full", className, ...rest } = props;

  const buttonClassName = twMerge(
    "font-semibold outline-none",
    "transition-all ease-in-out",
    "disabled:cursor-not-allowed",
    variant !== "naked" && "px-4 py-2",
    variant === "full" &&
      "bg-primary hover:bg-primary/70 rounded-lg hover:text-gray-200",
    variant === "flat" && "hover:text-gray-400 hover:underline",
    variant === "naked" && "bg-transparent",
    className,
  );

  return <button {...rest} className={buttonClassName} />;
};
