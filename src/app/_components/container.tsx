export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex flex-col justify-center gap-8 px-4 py-16">
      {children}
    </div>
  );
};
