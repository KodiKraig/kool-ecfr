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
        "bg-primary/20 flex h-full w-full flex-col items-center justify-center rounded-lg",
        isLoading && "animate-pulse",
      )}
    >
      {emptyText && (
        <p className="text-center font-medium text-gray-400">{emptyText}</p>
      )}
    </div>
  );
};

export const TooltipValueTitle = ({
  value,
  title,
}: {
  value: string;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-2 font-semibold">
      {value}
      <span className="text-sm text-gray-400">{title}</span>
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
