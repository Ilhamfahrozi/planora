import { db } from "../../config/database.js"
import { AppError } from "../../utils/error.js"
import type {
  CreateKategoriInput,
  UpdateKategoriInput,
} from "./kategori.validation.js"

// ─── Get All Kategori (Public) ────────────────────────────────────────────────
export const getAllKategori = async () => {
  return db.kategori.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      icon: true,
      description: true,
      _count: {
        select: { layanan: true },
      },
    },
  })
}

// ─── Get Kategori By ID ───────────────────────────────────────────────────────
export const getKategoriById = async (id: string) => {
  const kategori = await db.kategori.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      icon: true,
      description: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: { layanan: true },
      },
    },
  })
  if (!kategori) throw new AppError("Kategori tidak ditemukan", 404)
  return kategori
}

// ─── Create Kategori (Admin) ──────────────────────────────────────────────────
export const createKategori = async (input: CreateKategoriInput) => {
  const existingName = await db.kategori.findUnique({ where: { name: input.name } })
  if (existingName) throw new AppError("Nama kategori sudah ada", 409)

  const existingSlug = await db.kategori.findUnique({ where: { slug: input.slug } })
  if (existingSlug) throw new AppError("Slug kategori sudah ada", 409)

  return db.kategori.create({
    data: {
      name: input.name,
      slug: input.slug,
      icon: input.icon ?? null,
      description: input.description ?? null,
    },
  })
}

// ─── Update Kategori (Admin) ──────────────────────────────────────────────────
export const updateKategori = async (id: string, input: UpdateKategoriInput) => {
  const kategori = await db.kategori.findUnique({ where: { id } })
  if (!kategori) throw new AppError("Kategori tidak ditemukan", 404)

  if (input.name && input.name !== kategori.name) {
    const existing = await db.kategori.findUnique({ where: { name: input.name } })
    if (existing) throw new AppError("Nama kategori sudah ada", 409)
  }

  if (input.slug && input.slug !== kategori.slug) {
    const existing = await db.kategori.findUnique({ where: { slug: input.slug } })
    if (existing) throw new AppError("Slug kategori sudah ada", 409)
  }

  return db.kategori.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.slug !== undefined && { slug: input.slug }),
      ...(input.icon !== undefined && { icon: input.icon ?? null }),
      ...(input.description !== undefined && { description: input.description ?? null }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  })
}