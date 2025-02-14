import { AgencyList } from "@/app/_components/agency-list";
import { PageContainer } from "@/app/_components/container";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  void api.admin.agencies.prefetch();

  return (
    <HydrateClient>
      <div className="flex items-center justify-end self-end p-2">
        <button className="bg-darkBlue/70 hover:bg-darkBlue/90 rounded-lg p-2 font-bold hover:text-gray-200">
          Query Regulations
        </button>
      </div>

      <PageContainer className="items-center gap-4 pt-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-center text-xl font-bold md:text-3xl">
            Code of Federal Regulations
          </h1>
        </div>

        <h2 className="font-medium">Select an agency below to view metrics</h2>

        <Suspense
          fallback={<div className="self-center">Loading agencies...</div>}
        >
          <AgencyList />
        </Suspense>
      </PageContainer>
    </HydrateClient>
  );
}
