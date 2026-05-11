import { z } from "zod"

// ─── Create ───────────────────────────────────────────────────────────────────
export const createKategoriSchema = z.object({
  name: z
    .string({ required_error: "Nama kategori wajib diisi" })
    .min(2, "Nama minimal 2 karakter")
    .max(100),
  slug: z
    .string({ required_error: "Slug wajib diisi" })
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda -"),
  icon: z.string().optional(),
  description: z.string().max(500).optional(),
})

// ─── Update ───────────────────────────────────────────────────────────────────
export const updateKategoriSchema = createKategoriSchema.partial().extend({
  isActive: z.boolean().optional(),
})

// ─── Types ────────────────────────────────────────────────────────────────────
export type CreateKategoriInput = z.infer<typeof createKategoriSchema>
export type UpdateKategoriInput = z.infer<typeof updateKategoriSchema>