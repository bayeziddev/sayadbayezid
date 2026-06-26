import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, InsertInquiry, inquiries, InsertServiceOrder, serviceOrders, InsertNewsletter, newsletters, InsertFeedback, feedback, services } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============= INQUIRY HELPERS =============

export async function createInquiry(data: InsertInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(inquiries).values(data);
  return result;
}

export async function getInquiries(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(limit).offset(offset);
}

export async function getInquiryCount() {
  const db = await getDb();
  if (!db) return 0;
  
  const result = await db.select({ count: inquiries.id }).from(inquiries);
  return result[0]?.count || 0;
}

export async function updateInquiryStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(inquiries).set({ status: status as any }).where(eq(inquiries.id, id));
}

// ============= SERVICE ORDER HELPERS =============

export async function createServiceOrder(data: InsertServiceOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(serviceOrders).values(data);
  return result;
}

export async function getServiceOrders(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(serviceOrders).orderBy(desc(serviceOrders.createdAt)).limit(limit).offset(offset);
}

export async function getServiceOrderCount() {
  const db = await getDb();
  if (!db) return 0;
  
  const result = await db.select({ count: serviceOrders.id }).from(serviceOrders);
  return result[0]?.count || 0;
}

export async function updateServiceOrderStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(serviceOrders).set({ status: status as any }).where(eq(serviceOrders.id, id));
}

// ============= NEWSLETTER HELPERS =============

export async function createNewsletter(data: InsertNewsletter) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(newsletters).values(data);
  return result;
}

export async function getNewsletters(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(newsletters).orderBy(desc(newsletters.createdAt)).limit(limit).offset(offset);
}

export async function getNewsletterCount() {
  const db = await getDb();
  if (!db) return 0;
  
  const result = await db.select({ count: newsletters.id }).from(newsletters);
  return result[0]?.count || 0;
}

// ============= FEEDBACK HELPERS =============

export async function createFeedback(data: InsertFeedback) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(feedback).values(data);
  return result;
}

export async function getFeedback(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(feedback).orderBy(desc(feedback.createdAt)).limit(limit).offset(offset);
}

export async function getFeedbackCount() {
  const db = await getDb();
  if (!db) return 0;
  
  const result = await db.select({ count: feedback.id }).from(feedback);
  return result[0]?.count || 0;
}

export async function updateFeedbackStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(feedback).set({ status: status as any }).where(eq(feedback.id, id));
}

// ============= SERVICES HELPERS =============

export async function getServices() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(services).orderBy(services.order);
}

export async function createService(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(services).values(data);
  return result;
}
