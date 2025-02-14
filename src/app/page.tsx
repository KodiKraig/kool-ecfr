import { AgencyList } from "@/app/_components/agency-list";
import { Button } from "@/app/_components/button";
import { PageContainer } from "@/app/_components/container";
import { PageTitle } from "@/app/_components/title";
import { api, HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  void api.admin.agencies.prefetch();

  return (
    <HydrateClient>
      <div className="flex items-center justify-end self-end p-2">
        <Link href="/query">
          <Button>Query Regulations</Button>
        </Link>
      </div>

      <PageContainer className="items-center gap-4 pt-8">
        <PageTitle
          title="Code of Federal Regulations"
          subtitle="Select an agency below to view metrics"
        />

        <Suspense
          fallback={<div className="self-center">Loading agencies...</div>}
        >
          <AgencyList />
        </Suspense>
      </PageContainer>
    </HydrateClient>
  );
}
