import { z } from "zod"

const bookingStatuses = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const

const paymentStatuses = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const

const paginationBase = {
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
}

// ─── Dashboard Stats Query ────────────────────────────────────────────────────
export const getDashboardStatsQuerySchema = z.object({
  period: z.enum(["7d", "30d", "90d", "1y"]).optional(),
})

// ─── Admin: Get All Bookings Query ───────────────────────────────────────────
export const adminGetAllBookingsQuerySchema = z.object({
  ...paginationBase,
  status: z.enum(bookingStatuses).optional(),
  search: z.string().optional(),
})

// ─── Admin: Get All Payments Query ───────────────────────────────────────────
export const adminGetAllPaymentsQuerySchema = z.object({
  ...paginationBase,
  status: z.enum(paymentStatuses).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

// ─── Types ────────────────────────────────────────────────────────────────────
export type AdminGetAllBookingsQuery = z.infer<typeof adminGetAllBookingsQuerySchema>
export type AdminGetAllPaymentsQuery = z.infer<typeof adminGetAllPaymentsQuerySchema>
export type GetDashboardStatsQuery = z.infer<typeof getDashboardStatsQuerySchema>
