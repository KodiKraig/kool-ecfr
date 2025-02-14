import Link from "next/link";
import { ChevronLeft } from "@/app/_icons/chevron-left";
import { Button } from "@/app/_components/button";

export default function AgencyMetricsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-lightBlue sticky left-0 right-0 top-0 z-10 w-full border-b border-gray-500">
        <Link href="/">
          <Button variant="flat" className="flex items-center">
            <ChevronLeft />
            Back
          </Button>
        </Link>
      </div>
      {children}
    </>
  );
}
