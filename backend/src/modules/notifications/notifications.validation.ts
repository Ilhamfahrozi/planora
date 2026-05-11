import { z } from "zod"

const notificationTypes = [
  "BOOKING",
  "PAYMENT",
  "REVIEW",
  "SYSTEM",
  "VERIFICATION",
] as const

// ─── Schema Internal (dipanggil dari service lain) ────────────────────────────
export const createNotificationSchema = z.object({
  userId: z.string({ required_error: "userId wajib diisi" }),
  title: z.string({ required_error: "title wajib diisi" }),
  message: z.string({ required_error: "message wajib diisi" }),
  type: z.enum(notificationTypes, {
    required_error: "type wajib diisi",
    message: "type tidak valid",
  }),
  data: z.record(z.unknown()).optional(),
})

// ─── Schema Params (untuk endpoint mark as read) ──────────────────────────────
export const markAsReadSchema = z.object({
  id: z.string({ required_error: "Notification ID wajib diisi" }),
})

// ─── Schema Query (untuk GET /notifications) ──────────────────────────────────
export const getNotificationsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  type: z.enum(notificationTypes).optional(),
})

// ─── Types ────────────────────────────────────────────────────────────────────
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>
export type GetNotificationsQuery = z.infer<typeof getNotificationsQuerySchema>
export type NotificationType = (typeof notificationTypes)[number]
