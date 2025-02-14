"use client";

import roundedNumber from "@/utils/roundedNumber";
import { ChangeLogAreaChart } from "@/app/_components/area-chart";
import {
  MetricCard,
  CardSkeleton,
  CardContainer,
} from "@/app/_components/card";
import { Section } from "@/app/_components/section";
import { api } from "@/trpc/react";
import { ChartSkeleton } from "@/app/_components/chart";

const ChangelogContainer = ({
  chart,
  metrics,
}: {
  chart: React.ReactNode;
  metrics: React.ReactNode;
}) => {
  return (
    <Section
      heading={{
        title: "Changelog",
        subtitle:
          "Historical changes to the Code of Federal Regulations for the agency.",
      }}
    >
      <div className="flex flex-col gap-8">
        <div className="h-[400px] w-full">{chart}</div>

        <CardContainer>{metrics}</CardContainer>
      </div>
    </Section>
  );
};

export const ChangelogSkeleton = () => {
  return (
    <ChangelogContainer
      chart={<ChartSkeleton isLoading />}
      metrics={
        <>
          <CardSkeleton size="lg" />
          <CardSkeleton size="lg" />
          <CardSkeleton size="lg" />
          <CardSkeleton size="lg" />
        </>
      }
    />
  );
};

export const Changelog = ({ slug }: { slug: string }) => {
  const [{ changelog, totalChanges, avgChanges, maxChanges }] =
    api.search.countsDaily.useSuspenseQuery({
      agencySlugs: [slug],
    });

  return (
    <ChangelogContainer
      chart={<ChangeLogAreaChart data={changelog} />}
      metrics={
        <>
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
        </>
      }
    />
  );
};
