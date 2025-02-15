"use client";

import { useState, useRef, useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { InputLabel } from "@/app/_components/input";
import { SearchResultsSection } from "@/app/_components/search-results";
import { CountTitlesSection } from "@/app/_components/count-titles";
import { api } from "@/trpc/react";
import { type AppRouterOutput } from "@/server/api/root";
import { Button } from "@/app/_components/button";
import { twMerge } from "tailwind-merge";
import { XCircle } from "@/app/_icons/x-circle";

type Agency = AppRouterOutput["admin"]["searchAgencies"]["agencies"][number];

const useDebouncedSearch = (value?: string, delay?: number) => {
  const [search, setSearch] = useState(value ?? "");
  const debouncedSearch = useDebounce(search.trim(), delay ?? 500);
  const searchEnabled = debouncedSearch.length > 0;
  return {
    search,
    setSearch,
    debouncedSearch,
    searchEnabled,
  };
};

const AgencySearchDropdown = ({
  agencies,
  onAgencyClick,
  isLoading,
}: {
  agencies: Agency[] | undefined;
  onAgencyClick: (agency: Agency) => void;
  isLoading: boolean;
}) => {
  const rootClassName = twMerge(
    "absolute z-10",
    "divide-y divide-gray-700",
    "border-t border-gray-700",
    "transition-all duration-300 ease-in-out",
    "flex max-h-96 w-full flex-col gap-2 overflow-y-auto rounded-b-lg bg-gray-800",
  );

  return (
    <div className={rootClassName} onMouseLeave={(e) => e.preventDefault()}>
      {isLoading ? (
        <p className="animate-pulse p-2 text-xs text-gray-500">
          Fetching agencies...
        </p>
      ) : (
        <>
          {agencies?.map((agency) => (
            <Button
              className="text-sm"
              variant="flat"
              key={agency.slug}
              onClick={() => {
                onAgencyClick(agency);
              }}
            >
              {agency.display_name}
            </Button>
          ))}
          {agencies && agencies.length === 0 && (
            <p className="p-2 text-xs text-gray-500">No agencies found</p>
          )}
        </>
      )}
    </div>
  );
};

export function QueryContent() {
  const { search, setSearch, debouncedSearch, searchEnabled } =
    useDebouncedSearch();

  const {
    search: agency,
    setSearch: setAgency,
    debouncedSearch: debouncedAgency,
  } = useDebouncedSearch();

  const [agencyList, setAgencyList] = useState<Agency[]>([]);
  const agencySearchSlugs = useMemo(
    () => agencyList.map((agency) => agency.slug),
    [agencyList],
  );

  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { data: agencyData, isLoading } = api.admin.searchAgencies.useQuery({
    query: debouncedAgency,
    excludedAgencySlugs: agencySearchSlugs,
  });

  const enabled = searchEnabled || agencyList.length > 0;

  const onAgencyClick = (agency: Agency) => {
    if (agencyList.some((a) => a.slug === agency.slug)) {
      setAgencyList(agencyList.filter((a) => a.slug !== agency.slug));
    } else {
      setAgencyList([...agencyList, agency]);
    }

    setAgency("");
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-darkBlue/30 p-6 md:w-96 lg:w-[500px]">
        <InputLabel
          label="Keywords"
          type="text"
          spellCheck={false}
          placeholder="Search keywords"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="relative w-full">
          <InputLabel
            label="Agencies"
            type="text"
            placeholder="Search federal agencies"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              timeoutRef.current = setTimeout(() => {
                setIsFocused(false);
              }, 200);
            }}
          />

          {isFocused && (
            <AgencySearchDropdown
              agencies={agencyData?.agencies}
              onAgencyClick={(agency) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                onAgencyClick(agency);
                setIsFocused(false);
              }}
              isLoading={isLoading}
            />
          )}
        </div>

        <p className="text-xs text-gray-500">
          Queries the most up-to-date eCFR
        </p>
      </div>

      <div className="flex min-h-12 flex-wrap items-center justify-center gap-4">
        {agencyList.map((agency) => (
          <Button
            key={agency.slug}
            className="flex items-center gap-2"
            onClick={() => {
              onAgencyClick(agency);
            }}
          >
            {agency.short_name && agency.short_name.length > 0
              ? agency.display_name
              : agency.short_name}
            <XCircle />
          </Button>
        ))}
      </div>

      <CountTitlesSection
        query={debouncedSearch}
        agencySearchSlugs={agencySearchSlugs}
        enabled={enabled}
      />

      <SearchResultsSection
        query={debouncedSearch}
        agencySearchSlugs={agencySearchSlugs}
        enabled={enabled}
      />
    </div>
  );
}
