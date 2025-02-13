"use client";

import { Card } from "@/app/_components/card";
import { Section } from "@/app/_components/section";
import { type AppRouterOutput } from "@/server/api/root";
import Link from "next/link";
import { api } from "@/trpc/react";

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
    <p className="font-bold">
      {label} <span className="font-semibold">{value}</span>
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

export const AgencyInfo = ({ slug }: { slug: string }) => {
  const [{ agency }] = api.admin.agency.useSuspenseQuery({ slug });

  if (!agency) {
    return <div>Agency not found</div>;
  }

  return (
    <>
      <div className="flex max-w-2xl flex-col items-center gap-2">
        <Link href={`/`} className="hover:cursor-pointer hover:underline">
          <h1 className="text-center text-2xl font-bold">
            {agency.display_name}
          </h1>
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
        <div className="flex flex-wrap gap-2">
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
