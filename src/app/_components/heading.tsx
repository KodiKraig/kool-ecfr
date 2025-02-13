export type HeadingProps = {
  title: string;
  subtitle: string;
};

export const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="flex w-full flex-col border-b border-gray-500 pb-1">
      <h1 className="text-md font-bold">{title}</h1>
      <h2 className="text-sm font-medium text-gray-300">{subtitle}</h2>
    </div>
  );
};
