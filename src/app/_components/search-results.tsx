"use client";

import { api } from "@/trpc/react";
import { type AppRouterOutput } from "@/server/api/root";
import { twMerge } from "tailwind-merge";
import roundedNumber from "@/utils/roundedNumber";
import { Button } from "@/app/_components/button";
import { Section } from "@/app/_components/section";

type SearchResultType = AppRouterOutput["search"]["results"]["results"][number];

const HierarchyText = ({
  value,
  className,
}: {
  value: string | null;
  className?: string;
}) => {
  if (!value) return null;

  return <p className={twMerge("text-sm text-gray-400", className)}>{value}</p>;
};

const LoadingText = ({ children }: { children: React.ReactNode }) => {
  return <p className="animate-pulse text-gray-400">{children}</p>;
};

const EmptyText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={twMerge(
        "self-center py-12 font-medium text-gray-400",
        className,
      )}
    >
      {children}
    </p>
  );
};

const generateKey = ({
  result,
  index,
}: {
  result: SearchResultType;
  index: number;
}) => {
  const { hierarchy_headings } = result;
  return `${hierarchy_headings.section}-${hierarchy_headings.title}-${hierarchy_headings.chapter}-${hierarchy_headings.subchapter}-${hierarchy_headings.part}-${hierarchy_headings.subpart}-${hierarchy_headings.appendix}-${index}`;
};

const SearchResult = ({ result }: { result: SearchResultType }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <HierarchyText
          value={result.hierarchy_headings.section}
          className="text-xl font-bold text-gray-200"
        />

        <HierarchyText value={result.hierarchy_headings.title} />
        <HierarchyText value={result.hierarchy_headings.chapter} />
        <HierarchyText value={result.hierarchy_headings.subchapter} />
        <HierarchyText value={result.hierarchy_headings.part} />
        <HierarchyText value={result.hierarchy_headings.subpart} />
        <HierarchyText value={result.hierarchy_headings.appendix} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: result.full_text_excerpt ?? "" }} />
    </div>
  );
};

export const SearchResultsSection = ({
  query,
  agencySearchSlugs,
  enabled,
}: {
  query: string;
  agencySearchSlugs: string[];
  enabled: boolean;
}) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.search.results.useInfiniteQuery(
      {
        query,
        agencySlugs: agencySearchSlugs,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled,
      },
    );

  const totalCount = data?.pages[0]?.meta.total_count;

  return (
    <Section
      heading={{
        title: "Search Results",
        subtitle:
          data?.pages[0]?.meta.description ??
          "Locations within the CFR that match the query will be shown below.",
      }}
    >
      {isLoading && <LoadingText>Fetching results...</LoadingText>}

      {data ? (
        <>
          <p className={twMerge("text-sm text-gray-400", !data && "invisible")}>
            {roundedNumber(totalCount ?? 0, ",")} results found
          </p>

          <div className="flex flex-col gap-4">
            {data.pages
              .flatMap((page) => page.results)
              .map((result, index) => (
                <SearchResult
                  key={generateKey({ result, index })}
                  result={result}
                />
              ))}

            <div className="flex flex-col items-center self-center">
              {hasNextPage ? (
                // TODO: Would like to have infinite scroll here.
                <Button
                  variant="flat"
                  className={twMerge(isFetchingNextPage && "invisible")}
                  onClick={() => fetchNextPage()}
                >
                  Load more
                </Button>
              ) : (
                <EmptyText>
                  {totalCount && totalCount > 0
                    ? "End of results"
                    : "No results found"}
                </EmptyText>
              )}

              {isFetchingNextPage && (
                <LoadingText>Fetching more results...</LoadingText>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {!isLoading && (
            <EmptyText className="py-32">Enter a search query</EmptyText>
          )}
        </>
      )}
    </Section>
  );
};
