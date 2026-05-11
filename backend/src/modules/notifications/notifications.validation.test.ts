import { describe, it, expect } from "vitest"
import {
  createNotificationSchema,
  markAsReadSchema,
  getNotificationsQuerySchema,
} from "./notifications.validation.js"

describe("Notifications Validation", () => {
  // ──────────────────────────────────────────────────────────────
  // createNotificationSchema (internal — dipanggil dari service lain)
  // ──────────────────────────────────────────────────────────────
  describe("createNotificationSchema", () => {
    // ─── Positive ─────────────────────────────────────────────
    it("should pass with all required fields", () => {
      const result = createNotificationSchema.safeParse({
        userId: "user-1",
        title: "Pesanan Baru",
        message: "Kamu mendapat pesanan baru dari Andi",
        type: "BOOKING",
      })
      expect(result.success).toBe(true)
    })

    it("should pass with optional data field", () => {
      const result = createNotificationSchema.safeParse({
        userId: "user-1",
        title: "Pembayaran Berhasil",
        message: "Pembayaran untuk booking #123 berhasil",
        type: "PAYMENT",
        data: { bookingId: "booking-123", amount: 500000 },
      })
      expect(result.success).toBe(true)
    })

    it("should pass with all valid notification types", () => {
      const types = ["BOOKING", "PAYMENT", "REVIEW", "SYSTEM", "VERIFICATION"]
      for (const type of types) {
        const result = createNotificationSchema.safeParse({
          userId: "user-1",
          title: "Test",
          message: "Test message",
          type,
        })
        expect(result.success).toBe(true)
      }
    })

    it("should pass without data (optional)", () => {
      const result = createNotificationSchema.safeParse({
        userId: "user-1",
        title: "System Update",
        message: "Maintenance dijadwalkan",
        type: "SYSTEM",
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.data).toBeUndefined()
      }
    })

    // ─── Negative ─────────────────────────────────────────────
    it("should fail without userId", () => {
      const result = createNotificationSchema.safeParse({
        title: "Test",
        message: "Test message",
        type: "BOOKING",
      })
      expect(result.success).toBe(false)
    })

    it("should fail without title", () => {
      const result = createNotificationSchema.safeParse({
        userId: "user-1",
        message: "Test message",
        type: "BOOKING",
      })
      expect(result.success).toBe(false)
    })

    it("should fail without message", () => {
      const result = createNotificationSchema.safeParse({
        userId: "user-1",
        title: "Test",
        type: "BOOKING",
      })
      expect(result.success).toBe(false)
    })

    it("should fail without type", () => {
      const result = createNotificationSchema.safeParse({
        userId: "user-1",
        title: "Test",
        message: "Test message",
      })
      expect(result.success).toBe(false)
    })

    it("should fail with invalid type", () => {
      const result = createNotificationSchema.safeParse({
        userId: "user-1",
        title: "Test",
        message: "Test message",
        type: "INVALID_TYPE",
      })
      expect(result.success).toBe(false)
    })

    it("should fail with empty object", () => {
      const result = createNotificationSchema.safeParse({})
      expect(result.success).toBe(false)
    })
  })

  // ──────────────────────────────────────────────────────────────
  // markAsReadSchema
  // ──────────────────────────────────────────────────────────────
  describe("markAsReadSchema", () => {
    it("should pass with valid notificationId", () => {
      const result = markAsReadSchema.safeParse({ id: "notif-1" })
      expect(result.success).toBe(true)
    })

    it("should fail without id", () => {
      const result = markAsReadSchema.safeParse({})
      expect(result.success).toBe(false)
    })

    it("should fail with non-string id", () => {
      const result = markAsReadSchema.safeParse({ id: 123 })
      expect(result.success).toBe(false)
    })
  })

  // ──────────────────────────────────────────────────────────────
  // getNotificationsQuerySchema
  // ──────────────────────────────────────────────────────────────
  describe("getNotificationsQuerySchema", () => {
    it("should pass without any query params (all defaults)", () => {
      const result = getNotificationsQuerySchema.safeParse({})
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(1)
        expect(result.data.limit).toBe(20)
      }
    })

    it("should pass with custom page and limit", () => {
      const result = getNotificationsQuerySchema.safeParse({
        page: "2",
        limit: "10",
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(2)
        expect(result.data.limit).toBe(10)
      }
    })

    it("should pass with type filter", () => {
      const result = getNotificationsQuerySchema.safeParse({
        type: "BOOKING",
      })
      expect(result.success).toBe(true)
    })

    it("should fail with invalid type filter", () => {
      const result = getNotificationsQuerySchema.safeParse({
        type: "INVALID",
      })
      expect(result.success).toBe(false)
    })
  })
})
