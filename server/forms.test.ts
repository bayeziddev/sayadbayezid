import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Forms - Inquiries", () => {
  it("should submit an inquiry with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inquiries.submit({
      name: "John Doe",
      email: "john@example.com",
      message: "I would like to inquire about your services for a web development project.",
    });

    expect(result.success).toBe(true);
  });

  it("should reject inquiry with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.submit({
        name: "John Doe",
        email: "invalid-email",
        message: "I would like to inquire about your services.",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("should reject inquiry with short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.submit({
        name: "John Doe",
        email: "john@example.com",
        message: "Short",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("at least 10 characters");
    }
  });

  it("should list inquiries for admin only", async () => {
    const adminCtx = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    const result = await adminCaller.inquiries.list({ limit: 10, offset: 0 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("should reject inquiry listing for non-admin", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.list({ limit: 10, offset: 0 });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Please login");
    }
  });
});

describe("Forms - Service Orders", () => {
  it("should submit a service order with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.serviceOrders.submit({
      clientName: "Jane Smith",
      clientEmail: "jane@example.com",
      serviceName: "Web Design",
      orderDetails: "I need a modern website for my business with e-commerce capabilities.",
      budget: "5000",
    });

    expect(result.success).toBe(true);
  });

  it("should reject order with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.serviceOrders.submit({
        clientName: "Jane Smith",
        clientEmail: "invalid",
        serviceName: "Web Design",
        orderDetails: "I need a modern website.",
        budget: "5000",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("should submit order without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.serviceOrders.submit({
      clientName: "Jane Smith",
      clientEmail: "jane@example.com",
      serviceName: "Consulting",
    });

    expect(result.success).toBe(true);
  });

  it("should list orders for admin only", async () => {
    const adminCtx = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    const result = await adminCaller.serviceOrders.list({ limit: 10, offset: 0 });
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Forms - Newsletter", () => {
  it("should subscribe to newsletter with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletters.subscribe({
      name: "Bob Wilson",
      email: `bob-${Date.now()}@example.com`,
    });

    expect(result.success).toBe(true);
  });

  it("should reject newsletter subscription with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.newsletters.subscribe({
        name: "Bob Wilson",
        email: "invalid-email",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("should list newsletters for admin only", async () => {
    const adminCtx = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    const result = await adminCaller.newsletters.list({ limit: 10, offset: 0 });
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Forms - Feedback", () => {
  it("should submit feedback with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.feedback.submit({
      name: "Alice Johnson",
      email: "alice@example.com",
      rating: 5,
      message: "Excellent service! Highly recommended.",
    });

    expect(result.success).toBe(true);
  });

  it("should reject feedback with invalid rating", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.feedback.submit({
        name: "Alice Johnson",
        email: "alice@example.com",
        rating: 10,
        message: "Excellent service!",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("between 1 and 5");
    }
  });

  it("should reject feedback with short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.feedback.submit({
        name: "Alice Johnson",
        email: "alice@example.com",
        rating: 5,
        message: "Good",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("at least 5 characters");
    }
  });

  it("should list feedback for admin only", async () => {
    const adminCtx = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    const result = await adminCaller.feedback.list({ limit: 10, offset: 0 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("should reject feedback listing for non-admin", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.feedback.list({ limit: 10, offset: 0 });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Please login");
    }
  });
});

describe("Services", () => {
  it("should list services publicly", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.services.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Admin Dashboard", () => {
  it("should show dashboard stats for admin", async () => {
    const adminCtx = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    const result = await adminCaller.admin.dashboard();
    expect(result).toHaveProperty("inquiriesCount");
    expect(result).toHaveProperty("ordersCount");
    expect(result).toHaveProperty("newslettersCount");
    expect(result).toHaveProperty("feedbackCount");
  });

  it("should reject dashboard access for non-admin", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.admin.dashboard();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Please login");
    }
  });
});
