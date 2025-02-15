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
        "bg-primary/30 flex flex-col items-center gap-2 rounded-lg p-4",
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

// Containers

export const CardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex flex-wrap justify-center gap-4", className)}>
      {children}
    </div>
  );
};

// Custom Cards

export const MetricCard = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <p className="text-md font-medium md:text-lg">{label}</p>
      <p className="text-lg font-bold md:text-2xl">{value}</p>
    </Card>
  );
};
