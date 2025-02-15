import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const adminRouter = createTRPCRouter({
  agencies: publicProcedure.query(async ({ ctx }) => {
    const response = await ctx.ecfr.admin.getAgencies();

    if (response.agencies.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No agencies found",
      });
    }

    return response.agencies;
  }),
  agency: publicProcedure
    .input(z.object({ slug: z.string().trim().toLowerCase() }))
    .query(async ({ ctx, input }) => {
      const { agencies } = await ctx.ecfr.admin.getAgencies();

      const agency = agencies
        .flatMap((agency) => [agency, ...agency.children])
        .find((agency) => agency.slug.toLowerCase() === input.slug);

      return { agency };
    }),
  searchAgencies: publicProcedure
    .input(
      z.object({
        query: z.string().trim().toLowerCase(),
        excludedAgencySlugs: z
          .array(z.string().trim().toLowerCase())
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { agencies } = await ctx.ecfr.admin.getAgencies();

      let filtered = agencies;

      if (input.excludedAgencySlugs && input.excludedAgencySlugs.length > 0) {
        filtered = filtered.filter(
          (agency) =>
            !input.excludedAgencySlugs!.includes(agency.slug.toLowerCase()),
        );
      }

      if (input.query.length > 0) {
        filtered = agencies
          .flatMap((agency) => [agency, ...agency.children])
          .filter(
            (agency) =>
              agency.name?.toLowerCase().includes(input.query) ||
              agency.short_name?.toLowerCase().includes(input.query) ||
              agency.slug.toLowerCase().includes(input.query),
          );
      }

      return { agencies: filtered };
    }),
});
