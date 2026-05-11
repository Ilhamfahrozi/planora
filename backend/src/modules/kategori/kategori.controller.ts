import type { Request, Response, NextFunction } from "express"
import * as kategoriService from "./kategori.service.js"
import {
  createKategoriSchema,
  updateKategoriSchema,
} from "./kategori.validation.js"
import { sendSuccess, sendCreated, sendValidationError } from "../../utils/response.js"

// ─── Get All Kategori (Public) ────────────────────────────────────────────────
export const getAllKategori = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  const result = await kategoriService.getAllKategori()
  sendSuccess(res, result, "Data kategori berhasil diambil")
}

// ─── Get Kategori By ID ───────────────────────────────────────────────────────
export const getKategoriById = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  const result = await kategoriService.getKategoriById(String(req.params["id"] ?? ""))
  sendSuccess(res, result, "Data kategori berhasil diambil")
}

// ─── Create Kategori (Admin) ──────────────────────────────────────────────────
export const createKategori = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  const parsed = createKategoriSchema.safeParse(req.body)
  if (!parsed.success) { sendValidationError(res, parsed.error.flatten().fieldErrors); return }

  const result = await kategoriService.createKategori(parsed.data)
  sendCreated(res, result, "Kategori berhasil dibuat")
}

// ─── Update Kategori (Admin) ──────────────────────────────────────────────────
export const updateKategori = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  const parsed = updateKategoriSchema.safeParse(req.body)
  if (!parsed.success) { sendValidationError(res, parsed.error.flatten().fieldErrors); return }

  const result = await kategoriService.updateKategori(
    String(req.params["id"] ?? ""),
    parsed.data
  )
  sendSuccess(res, result, "Kategori berhasil diperbarui")
}