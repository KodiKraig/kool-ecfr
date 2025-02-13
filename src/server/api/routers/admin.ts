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
});
