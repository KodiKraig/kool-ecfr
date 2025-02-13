import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const SearchParams = z.object({
  query: z.string().trim().optional(),
  agencySlugs: z.array(z.string().trim()).optional(),
});

export const searchRouter = createTRPCRouter({
  countHierarchy: publicProcedure
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
});
