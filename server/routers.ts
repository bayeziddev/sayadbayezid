import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============= SERVICES =============
  services: router({
    list: publicProcedure.query(async () => {
      return await db.getServices();
    }),
  }),

  // ============= INQUIRIES =============
  inquiries: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        await db.createInquiry({
          name: input.name,
          email: input.email,
          message: input.message,
          status: "new",
        });

        // Send notifications
        await notifyOwner({
          title: "New Client Inquiry",
          content: `${input.name} (${input.email}) submitted an inquiry: ${input.message}`,
        });

        return { success: true }
      }),

    list: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await db.getInquiries(input.limit, input.offset);
      }),

    count: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await db.getInquiryCount();
    }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "responded"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        await db.updateInquiryStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // ============= SERVICE ORDERS =============
  serviceOrders: router({
    submit: publicProcedure
      .input(z.object({
        clientName: z.string().min(1, "Name is required"),
        clientEmail: z.string().email("Invalid email"),
        serviceName: z.string().min(1, "Service name is required"),
        orderDetails: z.string().optional(),
        budget: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createServiceOrder({
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          serviceName: input.serviceName,
          orderDetails: input.orderDetails || null,
          budget: input.budget ? (parseFloat(input.budget) as any) : null,
          status: "pending",
        });

        // Send notifications
        await notifyOwner({
          title: "New Service Order",
          content: `${input.clientName} ordered ${input.serviceName}. Details: ${input.orderDetails || "None provided"}`,
        });

        return { success: true }
      }),

    list: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await db.getServiceOrders(input.limit, input.offset);
      }),

    count: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await db.getServiceOrderCount();
    }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "completed"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        await db.updateServiceOrderStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // ============= NEWSLETTERS =============
  newsletters: router({
    subscribe: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
      }))
      .mutation(async ({ input }) => {
        try {
          await db.createNewsletter({
            name: input.name,
            email: input.email,
            status: "subscribed",
          });

          // Send notifications
          await notifyOwner({
            title: "New Newsletter Subscriber",
            content: `${input.name} (${input.email}) subscribed to the newsletter`,
          });

          return { success: true }
        } catch (error: any) {
          // Handle duplicate email
          if (error.code === "ER_DUP_ENTRY") {
            return { success: false, message: "Email already subscribed" };
          }
          throw error;
        }
      }),

    list: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await db.getNewsletters(input.limit, input.offset);
      }),

    count: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await db.getNewsletterCount();
    }),
  }),

  // ============= FEEDBACK =============
  feedback: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
        message: z.string().min(5, "Message must be at least 5 characters"),
      }))
      .mutation(async ({ input }) => {
        await db.createFeedback({
          name: input.name,
          email: input.email,
          rating: input.rating,
          message: input.message,
          status: "new",
        });

        // Send notifications
        await notifyOwner({
          title: `New Feedback - ${input.rating} Star Rating`,
          content: `${input.name} (${input.email}) left feedback: ${input.message}`,
        });

        return { success: true }
      }),

    list: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await db.getFeedback(input.limit, input.offset);
      }),

    count: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await db.getFeedbackCount();
    }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "archived"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        await db.updateFeedbackStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // ============= ADMIN DASHBOARD =============
  admin: router({
    dashboard: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return {
        inquiriesCount: await db.getInquiryCount(),
        ordersCount: await db.getServiceOrderCount(),
        newslettersCount: await db.getNewsletterCount(),
        feedbackCount: await db.getFeedbackCount(),
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
