import { twMerge } from "tailwind-merge";

export const ChartSkeleton = ({
  isLoading,
  emptyText,
}: {
  isLoading?: boolean;
  emptyText?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex h-full w-full flex-col items-center justify-center rounded-lg bg-darkBlue",
        isLoading && "animate-pulse",
      )}
    >
      {emptyText && (
        <p className="text-center font-medium text-gray-400">{emptyText}</p>
      )}
    </div>
  );
};

export const TooltipContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-gray-900 p-3">
      {children}
    </div>
  );
};
