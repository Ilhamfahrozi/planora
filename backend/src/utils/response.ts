import type { Response } from "express"

// ─── Response Types ─────────────────────────────────────────────────────────
type ApiSuccess<T> = {
  success: true
  message: string
  data: T
}

type ApiError = {
  success: false
  message: string
  errors?: unknown
}

// ─── Success Responses ──────────────────────────────────────────────────────
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  } satisfies ApiSuccess<T>)
}

export const sendCreated = <T>(
  res: Response,
  data: T,
  message = "Berhasil dibuat"
): Response => {
  return sendSuccess(res, data, message, 201)
}

// ─── Error Responses ────────────────────────────────────────────────────────
export const sendError = (
  res: Response,
  message = "Internal Server Error",
  statusCode = 500,
  errors?: unknown
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors !== undefined && { errors }),
  } satisfies ApiError)
}

export const sendNotFound = (res: Response, message = "Data tidak ditemukan"): Response => {
  return sendError(res, message, 404)
}

export const sendUnauthorized = (res: Response, message = "Tidak terautentikasi"): Response => {
  return sendError(res, message, 401)
}

export const sendForbidden = (res: Response, message = "Akses ditolak"): Response => {
  return sendError(res, message, 403)
}

export const sendValidationError = (res: Response, errors: unknown): Response => {
  return sendError(res, "Validasi gagal", 422, errors)
}