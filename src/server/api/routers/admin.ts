import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  agencies: publicProcedure.query(async ({ ctx }) => {
    const response = await ctx.ecfrApi.admin.getAgencies();

    if (response.agencies.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No agencies found",
      });
    }

    return {
      agencies: response.agencies,
    };
  }),
});
