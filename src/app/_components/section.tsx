import { Heading } from "@/app/_components/heading";
import { type HeadingProps } from "@/app/_components/heading";
import { twMerge } from "tailwind-merge";

export const Section = ({
  heading,
  children,
  className,
}: {
  heading: HeadingProps;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex w-full flex-col gap-2", className)}>
      <Heading {...heading} />
      {children}
    </div>
  );
};
