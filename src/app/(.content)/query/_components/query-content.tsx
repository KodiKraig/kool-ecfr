"use client";

import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { InputLabel } from "@/app/_components/input";
import { SearchResultsSection } from "@/app/_components/search-results";
import { CountTitlesSection } from "@/app/_components/count-titles";

export function QueryContent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim(), 500);
  const enabled = debouncedSearch.length > 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-darkBlue/50 p-4 md:w-96">
        <InputLabel
          label="Keywords"
          type="text"
          spellCheck={false}
          placeholder="Searches headings and the full text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputLabel
          label="Agency"
          type="text"
          placeholder="Enter agency name"
        />

        <p className="pt-2 text-xs text-gray-500">
          Queries the most up-to-date eCFR
        </p>
      </div>

      <CountTitlesSection query={debouncedSearch} enabled={enabled} />

      <SearchResultsSection query={debouncedSearch} enabled={enabled} />
    </div>
  );
}
