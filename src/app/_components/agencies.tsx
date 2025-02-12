"use client";

import { type Agency } from "@/server/lib/ecfr/admin";
import { ArrowTurnDownRight } from "@/app/_icons/arrow-turn-down-right";
import { useState } from "react";

const Agency = ({ agency }: { agency: Agency }) => {
  return (
    <div>
      <button className="flex w-full items-center justify-between text-wrap rounded-lg p-2 text-start font-semibold transition-all hover:bg-gray-700 hover:text-gray-200">
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

export const AgencyList = ({ agencies }: { agencies: Agency[] }) => {
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
      <input
        type="text"
        value={filter}
        onChange={(e) => handleFilterTextChange(e.target.value)}
        placeholder="Search for an agency"
        className="w-full rounded-md bg-gray-600 p-2 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
      />

      <p className="py-2 text-sm text-gray-400">{totalCount} agencies found</p>

      <div className="flex max-h-[60vh] w-full flex-col overflow-y-auto border-b border-t border-gray-600 py-2">
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
