"use client";

import { Section } from "@/app/_components/section";
import { ChevronLeft } from "@/app/_icons/chevron-left";
import { type AppRouterOutput } from "@/server/api/root";
import { api } from "@/trpc/react";
import roundedNumber from "@/utils/roundedNumber";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
type CountsHierarchy =
  AppRouterOutput["search"]["countsHierarchy"]["children"][number];

const generateKey = (child: CountsHierarchy) => {
  // This might not be the best key, but it's better than using the index
  return `${child.structure_index}-${child.hierarchy_heading}-${child.heading}-${child.count}-${child.max_score}`;
};

const HierarchyChild = ({
  child,
  expanded = false,
}: {
  child: CountsHierarchy;
  expanded?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(expanded);
  const [expandDeep, setExpandDeep] = useState(expanded);

  const chevronClassName = twMerge(
    "transition-transform duration-300",
    isOpen ? "rotate-[270deg]" : "rotate-180",
  );

  const isDisabled = !child.children || child.children.length === 0;

  const handleClick = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      setExpandDeep(true);
    } else {
      setExpandDeep(false);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="hover:text-gray-200">
      <button
        onClick={handleClick}
        className="flex items-center hover:cursor-pointer hover:text-gray-300 hover:underline"
        disabled={isDisabled}
      >
        {!isDisabled && (
          <div className={chevronClassName}>
            <ChevronLeft />
          </div>
        )}

        <p className="font-medium">
          {child.hierarchy_heading ?? child.level}
          {child.heading && <span> - {child.heading}</span>}
          {" - "}
          <span className="text-gray-300">
            {roundedNumber(child.count, ",")}
          </span>
        </p>
      </button>
      {isOpen && (
        <div className="pl-4">
          {child.children?.map((child) => (
            <HierarchyChild
              key={generateKey(child)}
              child={child}
              expanded={expandDeep}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const AgencyHierarchy = ({ slug }: { slug: string }) => {
  const [{ children }] = api.search.countsHierarchy.useSuspenseQuery({
    agencySlugs: [slug],
  });

  return (
    <Section
      className="min-h-screen gap-4"
      heading={{
        title: "Hierarchy",
        subtitle:
          "A hierarchical view of the agency's regulation changes with total counts for each title and chapter.",
        rightContent: (
          <p className="text-nowrap text-sm text-gray-500">
            shift + click to expand
          </p>
        ),
      }}
    >
      {children.map((child) => (
        <HierarchyChild key={generateKey(child)} child={child} />
      ))}
    </Section>
  );
};
