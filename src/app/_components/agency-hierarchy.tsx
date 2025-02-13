"use client";

import { Section } from "@/app/_components/section";
import { api } from "@/trpc/react";

export const AgencyHierarchy = ({ slug }: { slug: string }) => {
  const [{ count }] = api.search.countsHierarchy.useSuspenseQuery({
    agencySlugs: [slug],
  });

  return (
    <Section
      heading={{
        title: "Hierarchy",
        subtitle:
          "A hierarchy of the agency's regulation changes for each title and chapter over time.",
      }}
    >
      <div>{count.value}</div>
    </Section>
  );
};
