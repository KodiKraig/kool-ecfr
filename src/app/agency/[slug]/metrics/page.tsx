import { PageContainer } from "@/app/_components/container";
import { api, HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import { Suspense } from "react";
import { AgencyInfo } from "@/app/_components/agency-info";
import { Changelog } from "@/app/_components/changelog";
import { AgencyHierarchy } from "@/app/_components/agency-hierarchy";

export const metadata: Metadata = {
  title: "Agency Metrics",
  description:
    "View federal agency metrics to see how the agency is mentioned within the Code of Federal Regulations.",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AgencyMetricsPage({ params }: Props) {
  const { slug } = await params;

  void api.admin.agency.prefetch({ slug: slug });
  void api.search.countsDaily.prefetch({ agencySlugs: [slug] });
  void api.search.countsHierarchy.prefetch({ agencySlugs: [slug] });

  return (
    <HydrateClient>
      <PageContainer>
        <div className="flex flex-col items-center gap-8">
          <Suspense fallback={<div>Loading agency info...</div>}>
            <AgencyInfo slug={slug} />
          </Suspense>

          <Suspense fallback={<div>Loading changes...</div>}>
            <Changelog slug={slug} />
          </Suspense>

          <Suspense fallback={<div>Loading agency hierarchy...</div>}>
            <AgencyHierarchy slug={slug} />
          </Suspense>
        </div>
      </PageContainer>
    </HydrateClient>
  );
}
