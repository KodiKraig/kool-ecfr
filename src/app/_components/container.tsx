import { twMerge } from "tailwind-merge";

export const PageContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "container flex flex-col justify-center gap-8 px-4 py-16",
        className,
      )}
    >
      {children}
    </div>
  );
};
