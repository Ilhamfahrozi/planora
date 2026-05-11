import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { env } from "./env.js"

// ─── Prisma v7 — Wajib pakai adapter ────────────────────────────────────────
const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
})

export const db = new PrismaClient({
  adapter,
  log:
    env.NODE_ENV === "development"
      ? ["query", "warn", "error"]
      : ["error"],
})
