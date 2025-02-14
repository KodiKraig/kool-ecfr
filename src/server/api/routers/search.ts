import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const SearchParams = z.object({
  query: z.string().trim().optional(),
  agencySlugs: z.array(z.string().trim()).optional(),
});

// This should probably be set in the frontend or dynamically set based on current date.
// Leaving this for now as I am not sure how to get the most recent valid date for the eCFR.
const SEARCH_DATE = new Date("2025-02-07");

export const searchRouter = createTRPCRouter({
  countsHierarchy: publicProcedure
    .input(SearchParams)
    .query(async ({ ctx, input }) => {
      return ctx.ecfr.search.countsHierarchy(input);
    }),
  countsDaily: publicProcedure
    .input(SearchParams)
    .query(async ({ ctx, input }) => {
      const response = await ctx.ecfr.search.countsDaily(input);

      const mapped = Object.entries(response.dates)
        .map(([date, count]) => ({
          date: new Date(date),
          formattedDate: date,
          count,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      const totalChanges = mapped.reduce((acc, curr) => acc + curr.count, 0);

      const avgChanges = totalChanges / mapped.length;

      const maxChanges = Math.max(...mapped.map((item) => item.count));

      return {
        changelog: mapped,
        totalChanges,
        avgChanges,
        maxChanges,
      };
    }),
  countsTitles: publicProcedure
    .input(SearchParams)
    .query(async ({ ctx, input }) => {
      const result = await ctx.ecfr.search.countsTitles({
        ...input,
        date: SEARCH_DATE,
      });

      const mapped = Object.entries(result.titles).map(([title, count]) => ({
        title,
        count,
      }));

      const totalOccurrences = mapped.reduce(
        (acc, curr) => acc + curr.count,
        0,
      );

      const avgOccurrences = totalOccurrences / mapped.length;

      const maxOccurrences = Math.max(...mapped.map((item) => item.count));

      return {
        titles: mapped,
        totalOccurrences,
        avgOccurrences,
        maxOccurrences,
        totalTitles: mapped.length,
      };
    }),
  results: publicProcedure
    .input(
      z.object({
        ...SearchParams.shape,
        cursor: z.number().optional().default(1),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit, ...rest } = input;

      const results = await ctx.ecfr.search.results({
        ...rest,
        page: cursor,
        perPage: limit,
        date: SEARCH_DATE,
      });

      const nextCursor =
        results.meta.current_page < results.meta.total_pages &&
        results.meta.total_pages > 0
          ? results.meta.current_page + 1
          : null;

      return {
        ...results,
        nextCursor,
      };
    }),
});
