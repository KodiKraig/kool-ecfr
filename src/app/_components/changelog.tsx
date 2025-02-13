"use client";

import roundedNumber from "@/utils/roundedNumber";
import { ChangeLogAreaChart } from "@/app/_components/area-chart";
import { Card } from "@/app/_components/card";
import { Section } from "@/app/_components/section";
import { api } from "@/trpc/react";

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
      <p className="text-md font-medium md:text-lg">{label}</p>
      <p className="text-lg font-bold md:text-2xl">{value}</p>
    </Card>
  );
};

export const Changelog = ({ slug }: { slug: string }) => {
  const [{ changelog, totalChanges, avgChanges, maxChanges }] =
    api.search.countsDaily.useSuspenseQuery({
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

        <div className="flex flex-wrap justify-center gap-4">
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
