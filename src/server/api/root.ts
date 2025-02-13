import { adminRouter } from "@/server/api/routers/admin";
import { searchRouter } from "@/server/api/routers/search";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { type inferRouterOutputs } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  search: searchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
