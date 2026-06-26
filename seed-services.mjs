import { drizzle } from "drizzle-orm/mysql2";
import { services } from "./drizzle/schema.ts";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const sampleServices = [
  {
    name: "Web Design",
    description: "Beautiful, modern website design tailored to your brand identity and business goals.",
    price: "2500",
    icon: "🎨",
    order: 1,
  },
  {
    name: "Web Development",
    description: "Full-stack development services using cutting-edge technologies and best practices.",
    price: "5000",
    icon: "💻",
    order: 2,
  },
  {
    name: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android platforms.",
    price: "8000",
    icon: "📱",
    order: 3,
  },
  {
    name: "E-Commerce Solutions",
    description: "Complete e-commerce platforms with payment processing and inventory management.",
    price: "6000",
    icon: "🛒",
    order: 4,
  },
  {
    name: "Digital Marketing",
    description: "Comprehensive digital marketing strategies including SEO, SEM, and social media.",
    price: "3000",
    icon: "📊",
    order: 5,
  },
  {
    name: "Brand Consulting",
    description: "Strategic brand development and consulting to establish your market presence.",
    price: "4000",
    icon: "🎯",
    order: 6,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding services...");
    
    for (const service of sampleServices) {
      await db.insert(services).values({
        name: service.name,
        description: service.description,
        price: parseFloat(service.price),
        icon: service.icon,
        order: service.order,
      });
      console.log(`✅ Added service: ${service.name}`);
    }
    
    console.log("🎉 Services seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    process.exit(1);
  }
}

seed();
