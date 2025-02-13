import { AgencyList } from "@/app/_components/agency-list";
import { PageContainer } from "@/app/_components/container";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  void api.admin.agencies.prefetch();

  return (
    <HydrateClient>
      <PageContainer>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-center text-xl font-bold md:text-3xl">
            Code of Federal Regulations
          </h1>
          <h2 className="text-gray-200">Select an agency to view metrics</h2>
        </div>

        <Suspense fallback={<div>Loading agencies...</div>}>
          <AgencyList />
        </Suspense>
      </PageContainer>
    </HydrateClient>
  );
}
