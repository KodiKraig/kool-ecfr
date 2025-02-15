export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-xl font-bold md:text-3xl">{title}</h1>

      <h2 className="text-center font-medium">{subtitle}</h2>
    </div>
  );
}
