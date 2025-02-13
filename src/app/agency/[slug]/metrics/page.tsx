import Link from "next/link";
import { PageContainer } from "@/app/_components/container";
import { api } from "@/trpc/server";
import roundedNumber from "@/utils/roundedNumber";
import { type Metadata } from "next";
import { Suspense } from "react";
import { ChangeLogAreaChart } from "@/app/_components/area-chart";

export const metadata: Metadata = {
  title: "Agency Metrics",
  description:
    "View federal agency metrics to see how the agency is mentioned within the Code of Federal Regulations.",
};

const MetricCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
  subLabel?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-900 p-4">
      <p className="text-lg font-medium">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const AgencyInfo = async ({ slug }: { slug: string }) => {
  const { agency } = await api.admin.agency({ slug });

  if (!agency) {
    return <div>Agency not found</div>;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Link href={`/`} className="hover:cursor-pointer hover:underline">
        <h1 className="text-2xl font-bold">{agency.display_name}</h1>
      </Link>
      <h2 className="text-lg font-medium text-gray-300">{agency.short_name}</h2>
    </div>
  );
};

const Content = async ({ params }: Props) => {
  const slug = await params;

  return (
    <div className="flex flex-col items-center gap-8">
      <Suspense fallback={<div>Loading agency details...</div>}>
        <AgencyInfo slug={slug.slug} />
      </Suspense>

      <Suspense fallback={<div>Loading changes...</div>}>
        <Changelog slug={slug.slug} />
      </Suspense>
    </div>
  );
};

const Changelog = async ({ slug }: { slug: string }) => {
  const { changelog, totalChanges, avgChanges, maxChanges } =
    await api.search.countsDaily({
      agencySlugs: [slug],
    });

  return (
    <div className="flex flex-col gap-8">
      <div className="h-[400px] w-full">
        <ChangeLogAreaChart data={changelog} />
      </div>

      <div className="flex flex-wrap gap-4">
        <MetricCard
          label="Total Changes"
          value={roundedNumber(totalChanges, ",.0f")}
        />
        <MetricCard
          label="Average Changes"
          value={roundedNumber(avgChanges, ",.2f")}
        />
        <MetricCard
          label="Maximum Changes"
          value={roundedNumber(maxChanges, ",.0f")}
        />
        <MetricCard
          label="Days with Changes"
          value={roundedNumber(changelog.length, ",.0f")}
        />
      </div>
    </div>
  );
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function AgencyMetricsPage(params: Props) {
  return (
    <PageContainer>
      <Suspense>
        <Content {...params} />
      </Suspense>
    </PageContainer>
  );
}
