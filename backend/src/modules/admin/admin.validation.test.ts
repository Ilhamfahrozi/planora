import { describe, it, expect } from "vitest"
import {
  getDashboardStatsQuerySchema,
  adminGetAllBookingsQuerySchema,
  adminGetAllPaymentsQuerySchema,
} from "./admin.validation.js"

describe("Admin Validation", () => {
  // ──────────────────────────────────────────────────────────────
  // getDashboardStatsQuerySchema
  // ──────────────────────────────────────────────────────────────
  describe("getDashboardStatsQuerySchema", () => {
    it("should pass with no params (all optional)", () => {
      const result = getDashboardStatsQuerySchema.safeParse({})
      expect(result.success).toBe(true)
    })

    it("should pass with valid period filter", () => {
      const periods = ["7d", "30d", "90d", "1y"] as const
      for (const period of periods) {
        const result = getDashboardStatsQuerySchema.safeParse({ period })
        expect(result.success).toBe(true)
      }
    })

    it("should fail with invalid period", () => {
      const result = getDashboardStatsQuerySchema.safeParse({ period: "2w" })
      expect(result.success).toBe(false)
    })
  })

  // ──────────────────────────────────────────────────────────────
  // adminGetAllBookingsQuerySchema
  // ──────────────────────────────────────────────────────────────
  describe("adminGetAllBookingsQuerySchema", () => {
    it("should pass with no params (defaults applied)", () => {
      const result = adminGetAllBookingsQuerySchema.safeParse({})
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(1)
        expect(result.data.limit).toBe(20)
      }
    })

    it("should pass with status filter", () => {
      const statuses = [
        "PENDING",
        "CONFIRMED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ]
      for (const status of statuses) {
        const result = adminGetAllBookingsQuerySchema.safeParse({ status })
        expect(result.success).toBe(true)
      }
    })

    it("should fail with invalid status", () => {
      const result = adminGetAllBookingsQuerySchema.safeParse({
        status: "INVALID_STATUS",
      })
      expect(result.success).toBe(false)
    })

    it("should pass with search and pagination", () => {
      const result = adminGetAllBookingsQuerySchema.safeParse({
        page: "2",
        limit: "15",
        search: "Andi",
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(2)
        expect(result.data.limit).toBe(15)
        expect(result.data.search).toBe("Andi")
      }
    })

    it("should fail with negative page number", () => {
      const result = adminGetAllBookingsQuerySchema.safeParse({ page: "0" })
      expect(result.success).toBe(false)
    })

    it("should fail with limit exceeding max (100)", () => {
      const result = adminGetAllBookingsQuerySchema.safeParse({ limit: "101" })
      expect(result.success).toBe(false)
    })
  })

  // ──────────────────────────────────────────────────────────────
  // adminGetAllPaymentsQuerySchema
  // ──────────────────────────────────────────────────────────────
  describe("adminGetAllPaymentsQuerySchema", () => {
    it("should pass with no params (defaults applied)", () => {
      const result = adminGetAllPaymentsQuerySchema.safeParse({})
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(1)
        expect(result.data.limit).toBe(20)
      }
    })

    it("should pass with valid payment status filters", () => {
      const statuses = ["PENDING", "PAID", "FAILED", "REFUNDED"]
      for (const status of statuses) {
        const result = adminGetAllPaymentsQuerySchema.safeParse({ status })
        expect(result.success).toBe(true)
      }
    })

    it("should fail with invalid payment status", () => {
      const result = adminGetAllPaymentsQuerySchema.safeParse({
        status: "UNKNOWN",
      })
      expect(result.success).toBe(false)
    })

    it("should pass with date range filter", () => {
      const result = adminGetAllPaymentsQuerySchema.safeParse({
        startDate: "2026-01-01",
        endDate: "2026-12-31",
      })
      expect(result.success).toBe(true)
    })
  })
})
