import { z } from "zod"

export const createReviewSchema = z.object({
  bookingId: z.string({ required_error: "Booking ID wajib diisi" }),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
})

export type CreateReviewInput = z.infer<typeof createReviewSchema>
