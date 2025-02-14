import { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props;

  const rootClassName = twMerge(
    "rounded-md bg-gray-600 p-2",
    "transition delay-100 ease-in-out",
    "focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700",
    className,
  );

  return <input {...rest} className={rootClassName} />;
};
