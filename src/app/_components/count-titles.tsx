"use client";

import { TitleOccurrencesBarChart } from "@/app/_components/bar-chart";
import { MetricCard } from "@/app/_components/card";
import { CardContainer } from "@/app/_components/card";
import { ChartSkeleton } from "@/app/_components/chart";
import { Section } from "@/app/_components/section";
import { api } from "@/trpc/react";
import roundedNumber from "@/utils/roundedNumber";
import clsx from "clsx";
import { useEffect } from "react";

const Cards = ({
  totalTitles,
  totalOccurrences,
  avgOccurrences,
  maxOccurrences,
  className,
}: {
  totalTitles: string;
  totalOccurrences: string;
  avgOccurrences: string;
  maxOccurrences: string;
  className?: string;
}) => {
  const cardClassName = "min-w-32";

  return (
    <CardContainer className={className}>
      <MetricCard
        className={cardClassName}
        label="Title Count"
        value={totalTitles}
      />
      <MetricCard
        className={cardClassName}
        label="Total"
        value={totalOccurrences}
      />
      <MetricCard
        className={cardClassName}
        label="Average"
        value={avgOccurrences}
      />
      <MetricCard
        className={cardClassName}
        label="Maximum"
        value={maxOccurrences}
      />
    </CardContainer>
  );
};

export const CountTitlesSection = ({
  query,
  agencySearchSlugs,
  enabled,
  onLoadingChange,
}: {
  query: string;
  agencySearchSlugs: string[];
  enabled: boolean;
  onLoadingChange?: (isLoading: boolean) => void;
}) => {
  const { data, isLoading } = api.search.countsTitles.useQuery(
    { query, agencySlugs: agencySearchSlugs },
    { enabled },
  );

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  return (
    <Section
      className="gap-8"
      heading={{
        title: "Title Breakdown",
        subtitle:
          "Occurrences across all titles within the CFR that contain the search query.",
      }}
    >
      <div className="h-[500px] w-full">
        {data?.titles && data.titles.length > 0 ? (
          <TitleOccurrencesBarChart data={data.titles} />
        ) : (
          <ChartSkeleton
            isLoading={isLoading}
            emptyText={clsx(
              isLoading && "Fetching metrics...",
              !isLoading && !data?.titles && "Enter a search query",
              !isLoading && data?.titles && "No titles found",
            )}
          />
        )}
      </div>

      {isLoading && (
        <Cards
          totalTitles="..."
          totalOccurrences="..."
          avgOccurrences="..."
          maxOccurrences="..."
          className="animate-pulse"
        />
      )}
      {data && (
        <Cards
          totalTitles={roundedNumber(data.totalTitles, ",")}
          totalOccurrences={roundedNumber(data.totalOccurrences, ",")}
          avgOccurrences={roundedNumber(data.avgOccurrences)}
          maxOccurrences={roundedNumber(data.maxOccurrences, ",")}
        />
      )}
      {!isLoading && !data && (
        <Cards
          totalTitles="0"
          totalOccurrences="0"
          avgOccurrences="0"
          maxOccurrences="0"
        />
      )}
    </Section>
  );
};
