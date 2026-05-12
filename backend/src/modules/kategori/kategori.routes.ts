import { Router } from "express"
import * as kategoriController from "./kategori.controller.js"
import { authenticate, authorize } from "../../middlewares/auth.middleware.js"

const router = Router()

// ─── Public ───────────────────────────────────────────────────────────────────
router.get("/", kategoriController.getAllKategori)
router.get("/:id", kategoriController.getKategoriById)

// ─── Admin Only ───────────────────────────────────────────────────────────────
router.post("/", authenticate, authorize("ADMIN"), kategoriController.createKategori)
router.patch("/:id", authenticate, authorize("ADMIN"), kategoriController.updateKategori)

export default router