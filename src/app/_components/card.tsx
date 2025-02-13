export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-darkBlue flex flex-col items-center gap-2 rounded-lg p-4">
      {children}
    </div>
  );
};
