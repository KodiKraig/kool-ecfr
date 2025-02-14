export type HeadingProps = {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
};

export const Heading = ({ title, subtitle, rightContent }: HeadingProps) => {
  return (
    <div className="flex items-end justify-between border-b border-gray-500 pb-1">
      <div className="flex w-full flex-col">
        <h1 className="text-md font-bold">{title}</h1>
        {subtitle && (
          <h2 className="text-sm font-medium text-gray-300">{subtitle}</h2>
        )}
      </div>
      {rightContent}
    </div>
  );
};
