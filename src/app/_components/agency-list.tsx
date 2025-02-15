"use client";

import { type Agency } from "@/server/lib/ecfr/admin";
import { ArrowTurnDownRight } from "@/app/_icons/arrow-turn-down-right";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Input } from "@/app/_components/input";
import { Button } from "@/app/_components/button";

const Agency = ({ agency }: { agency: Agency }) => {
  const router = useRouter();

  return (
    <div>
      <Button
        variant="naked"
        className="flex w-full items-center justify-between gap-4 text-wrap rounded-lg p-2 text-start font-semibold transition-all hover:bg-gray-700 hover:text-gray-200"
        onClick={() => {
          router.push(`/agency/${agency.slug}/metrics`);
        }}
      >
        <p className="max-w-3xl text-wrap">{agency.display_name}</p>
        <p className="pr-2 text-sm text-gray-300">
          {agency.cfr_references.length}
        </p>
      </Button>
      {agency.children && agency.children.length > 0 && (
        <div className="flex pl-1">
          <div className="pl-2 pt-1">
            <ArrowTurnDownRight />
          </div>
          <div className="w-full">
            {agency.children.map((child) => (
              <Agency key={child.slug} agency={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const AgencyList = () => {
  const [agencies] = api.admin.agencies.useSuspenseQuery();
  const [filteredAgencies, setFilteredAgencies] = useState(agencies);
  const [filter, setFilter] = useState("");

  const handleFilterTextChange = (value: string) => {
    setFilter(value);

    const trimmedFilter = value.trim().toLowerCase();

    if (trimmedFilter.length === 0) {
      setFilteredAgencies(agencies);
      return;
    }

    setFilteredAgencies(
      agencies
        .map((agency) => {
          const matchingChildren = agency.children?.filter((child) =>
            child.name.toLowerCase().includes(trimmedFilter),
          );

          if (agency.name.toLowerCase().includes(trimmedFilter)) {
            return agency;
          } else if (matchingChildren && matchingChildren.length > 0) {
            return {
              ...agency,
              children: matchingChildren,
            };
          }
          return null;
        })
        .filter((agency): agency is Agency => agency !== null),
    );
  };

  const calculateTotalCount = (agencies: Agency[]) => {
    return (
      agencies.reduce((acc, agency) => {
        return acc + (agency.children?.length || 0);
      }, 0) + agencies.length
    );
  };

  const totalCount = calculateTotalCount(filteredAgencies);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="bg-background sticky top-0 flex w-full flex-col items-center gap-2 py-4">
        <Input
          type="text"
          value={filter}
          onChange={(e) => handleFilterTextChange(e.target.value)}
          placeholder="Search for an agency"
          className="md:w-96"
        />

        <p className="py-2 text-sm text-gray-400">
          {totalCount} agencies found
        </p>
      </div>

      <div className="flex flex-col py-2">
        {filteredAgencies.length === 0 && (
          <div className="p-2">No agencies found</div>
        )}

        {filteredAgencies.map((agency) => (
          <Agency key={agency.slug} agency={agency} />
        ))}
      </div>
    </div>
  );
};
