import { twMerge } from "tailwind-merge";

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "bg-darkBlue flex flex-col items-center gap-2 rounded-lg p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

type CardSkeletonSize = "sm" | "lg";

export const CardSkeleton = ({ size = "sm" }: { size?: CardSkeletonSize }) => {
  const className = twMerge(
    size === "sm" && "h-12 w-20",
    size === "lg" && "h-20 w-40",
  );

  return (
    <Card className="animate-pulse">
      <div className={className} />
    </Card>
  );
};
