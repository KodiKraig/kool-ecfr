import { AgencyList } from "@/app/_components/agencies";
import { PageContainer } from "@/app/_components/container";
import { api } from "@/trpc/server";
import { Suspense } from "react";

const Agencies = async () => {
  const { agencies } = await api.admin.agencies();

  return <AgencyList agencies={agencies} />;
};

export default async function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">Code of Federal Regulations</h1>
        <h2 className="text-gray-200">Select an agency to view metrics</h2>
      </div>

      <Suspense fallback={<div>Loading agencies...</div>}>
        <Agencies />
      </Suspense>
    </PageContainer>
  );
}
