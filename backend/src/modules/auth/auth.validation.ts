import { z } from "zod"

// ─── Register ────────────────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z
    .string({ required_error: "Nama wajib diisi" })
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Format email tidak valid"),
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(8, "Password minimal 8 karakter"),
  role: z.enum(["CUSTOMER", "VENDOR"]).default("CUSTOMER"),
  phone: z.string().optional(),
})

// ─── Login ───────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Format email tidak valid"),
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(1, "Password wajib diisi"),
  appType: z.enum(["WEB", "MOBILE"], {
    required_error: "appType wajib diisi (WEB atau MOBILE)",
    invalid_type_error: "appType harus berupa WEB atau MOBILE",
  }),
})

// ─── Refresh Token ───────────────────────────────────────────────────────
export const refreshTokenSchema = z.object({
  refreshToken: z.string({ required_error: "Refresh token wajib diisi" }),
})

// ─── Forgot Password ────────────────────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Format email tidak valid"),
})

// ─── Reset Password ─────────────────────────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    token: z.string({ required_error: "Token reset wajib diisi" }),
    newPassword: z
      .string({ required_error: "Password baru wajib diisi" })
      .min(8, "Password baru minimal 8 karakter"),
    confirmPassword: z.string({
      required_error: "Konfirmasi password wajib diisi",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  })

// ─── Types ───────────────────────────────────────────────────────────────
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>