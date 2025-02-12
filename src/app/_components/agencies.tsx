"use client";

import { api } from "@/trpc/react";
import { type Agency } from "@/server/lib/ecfr/admin";
import { ArrowTurnDownRight } from "@/app/_icons/arrow-turn-down-right";
import { useState } from "react";

const Agency = ({ agency }: { agency: Agency }) => {
  return (
    <div>
      <button className="flex w-full items-center justify-between text-wrap rounded-lg p-2 font-semibold transition-all hover:bg-gray-700 hover:text-gray-200">
        <p>{agency.name}</p>
        <p className="pr-2 text-sm text-gray-300">
          {agency.cfr_references.length}
        </p>
      </button>
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

const AgencyList = ({ agencies }: { agencies: Agency[] }) => {
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
    <div className="flex w-3/4 flex-col items-center md:w-1/2">
      <div className="flex w-full flex-col items-center pb-4">
        <h1 className="text-3xl font-bold">Code of Federal Regulations</h1>

        <p className="text-sm text-gray-400">{totalCount} agencies found</p>
      </div>

      <input
        type="text"
        value={filter}
        onChange={(e) => handleFilterTextChange(e.target.value)}
        placeholder="Select an agency"
        className="mb-2 w-full rounded-md bg-gray-600 p-2 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
      />

      <div className="flex max-h-[80vh] w-full flex-col overflow-y-auto rounded-b-md border-t border-gray-600 pt-2">
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

export const Agencies = () => {
  const [{ agencies }, { isLoading, error }] =
    api.admin.agencies.useSuspenseQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <AgencyList agencies={agencies} />;
};
