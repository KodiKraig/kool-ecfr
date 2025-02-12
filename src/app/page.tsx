import { AgencyList } from "@/app/_components/agencies";
import { api } from "@/trpc/server";
import { Suspense } from "react";

const Agencies = async () => {
  const { agencies } = await api.admin.agencies();

  return <AgencyList agencies={agencies} />;
};

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">Code of Federal Regulations</h1>
          <h2 className="text-gray-200">Select an agency to view metrics</h2>
        </div>

        <Suspense fallback={<div>Loading agencies...</div>}>
          <Agencies />
        </Suspense>
      </div>
    </main>
  );
}
