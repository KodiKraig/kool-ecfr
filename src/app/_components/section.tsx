import { Heading } from "@/app/_components/heading";
import { type HeadingProps } from "@/app/_components/heading";
import { twMerge } from "tailwind-merge";

export const Section = ({
  heading,
  children,
  className,
  sectionClassName,
}: {
  heading: HeadingProps;
  children: React.ReactNode;
  className?: string;
  sectionClassName?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col gap-4", sectionClassName)}>
      <Heading {...heading} />

      <div className={twMerge("flex w-full flex-col gap-2", className)}>
        {children}
      </div>
    </div>
  );
};
