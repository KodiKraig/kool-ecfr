import { Heading } from "@/app/_components/heading";
import { type HeadingProps } from "@/app/_components/heading";

export const Section = ({
  heading,
  children,
}: {
  heading: HeadingProps;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Heading {...heading} />
      {children}
    </div>
  );
};
