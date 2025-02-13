import Link from "next/link";
import { PageContainer } from "@/app/_components/container";
import { api } from "@/trpc/server";
import roundedNumber from "@/utils/roundedNumber";
import { type Metadata } from "next";
import { Suspense } from "react";
import { ChangeLogAreaChart } from "@/app/_components/area-chart";
import { type AppRouterOutput } from "@/server/api/root";

export const metadata: Metadata = {
  title: "Agency Metrics",
  description:
    "View federal agency metrics to see how the agency is mentioned within the Code of Federal Regulations.",
};

// Composable

const Section = ({
  heading,
  children,
}: {
  heading: HeadingProps;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Heading {...heading} />
      {children}
    </div>
  );
};

type HeadingProps = {
  title: string;
  subtitle: string;
};

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="flex w-full flex-col border-b border-gray-500 pb-1">
      <h1 className="text-md font-bold">{title}</h1>
      <h2 className="text-sm font-medium text-gray-300">{subtitle}</h2>
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-900 p-4">
      {children}
    </div>
  );
};

// CFR References

type CFRReference =
  AppRouterOutput["admin"]["agencies"][number]["cfr_references"][number];

const ReferenceCardLineItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => {
  if (!value) {
    return null;
  }

  return (
    <p className="font-medium">
      {label} <span className="font-normal">{value}</span>
    </p>
  );
};
const ReferenceCard = ({ reference }: { reference: CFRReference }) => {
  return (
    <Card>
      <ReferenceCardLineItem label="Title" value={reference.title} />
      <ReferenceCardLineItem label="Chapter" value={reference.chapter} />
      <ReferenceCardLineItem label="Subchapter" value={reference.subchapter} />
    </Card>
  );
};

const AgencyInfo = async ({ slug }: { slug: string }) => {
  const { agency } = await api.admin.agency({ slug });

  if (!agency) {
    return <div>Agency not found</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <Link href={`/`} className="hover:cursor-pointer hover:underline">
          <h1 className="text-2xl font-bold">{agency.display_name}</h1>
        </Link>
        <h2 className="text-lg font-medium text-gray-300">
          {agency.short_name}
        </h2>
      </div>

      <Section
        heading={{
          title: "References",
          subtitle:
            "The locations in the Code of Federal Regulations where the agency is mentioned.",
        }}
      >
        <div className="flex gap-2">
          {agency.cfr_references.map((reference, index) => (
            <div key={index}>
              <ReferenceCard reference={reference} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

// Changelog

const MetricCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
  subLabel?: string;
}) => {
  return (
    <Card>
      <p className="text-lg font-medium">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
};

const Changelog = async ({ slug }: { slug: string }) => {
  const { changelog, totalChanges, avgChanges, maxChanges } =
    await api.search.countsDaily({
      agencySlugs: [slug],
    });

  return (
    <Section
      heading={{
        title: "Changelog",
        subtitle:
          "The history of changes to the Code of Federal Regulations for the agency.",
      }}
    >
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
    </Section>
  );
};

// Hierarchy

const AgencyHierarchy = async ({ slug }: { slug: string }) => {
  const { count } = await api.search.countsHierarchy({
    agencySlugs: [slug],
  });

  return (
    <Section
      heading={{
        title: "Hierarchy",
        subtitle:
          "A hierarchy of the agency's regulation changes for each title and chapter.",
      }}
    >
      <div>{count.value}</div>
    </Section>
  );
};

// Page

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

      <Suspense fallback={<div>Loading agency hierarchy...</div>}>
        <AgencyHierarchy slug={slug.slug} />
      </Suspense>
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
