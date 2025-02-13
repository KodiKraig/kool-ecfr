import Link from "next/link";
import { ChevronLeft } from "@/app/_icons/chevron-left";

export default function AgencyMetricsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-lightBlue sticky left-0 right-0 top-0 z-10 w-full border-b border-gray-500">
        <Link
          href="/"
          className="flex items-center p-2 font-medium hover:cursor-pointer hover:text-gray-400 hover:underline"
        >
          <ChevronLeft />
          <button>Back</button>
        </Link>
      </div>
      {children}
    </>
  );
}
