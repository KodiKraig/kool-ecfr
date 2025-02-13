export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-900 p-4">
      {children}
    </div>
  );
};
