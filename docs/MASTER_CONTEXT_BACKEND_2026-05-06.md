# MASTER CONTEXT BACKEND - PLANORA

## Snapshot
- Tanggal: 6 Mei 2026
- Fokus sprint: Backend stabilization + API foundation
- Status rilis internal: pre-feature (fondasi backend)
- Prinsip kerja: preserve yang sudah jalan, additive changes, jangan refactor besar tanpa kebutuhan fitur

## Ringkasan Produk (Aktual Repo)
Planora saat ini adalah platform marketplace layanan event.
Backend sudah memiliki fondasi server dan skema database inti, tetapi belum masuk ke fase modul bisnis lengkap (auth flow production, teams, boards, tasks, review, invite, canvas, notifications).

## Stack Backend (Aktual)
- Runtime: Node.js
- Framework: Express 5 + TypeScript
- ORM: Prisma
- DB: PostgreSQL
- Port default backend: 5000

Catatan versi dari kode saat ini:
- prisma: 6.19.3
- @prisma/client: 7.6.0

## Status Implementasi Backend Saat Ini

### Sudah Ada
- Bootstrap Express app, middleware dasar, dan global error handler.
- Health endpoint: GET /
- Prisma client singleton.
- Prisma schema awal untuk domain marketplace:
  - User
  - VendorProfile
  - Service
  - Booking
  - Payment
  - Review
- Enum:
  - Role (CUSTOMER, VENDOR, ADMIN)
  - BookingStatus (PENDING, CONFIRMED, CANCELLED, COMPLETED)
  - PaymentStatus (PENDING, DP, PAID)
- 1 controller sederhana untuk fetch users (belum dipasang ke route app).

### Belum Ada (Gap Nyata)
- Route modular (router per domain) belum dipasang ke app.
- Auth production (register, login, refresh, logout, hash password, JWT, guard).
- Validasi request terstruktur (schema validation).
- Standard response envelope yang konsisten lintas endpoint.
- Layer service/repository per domain.
- Pagination/filter/sort pattern standar.
- Centralized error class + mapping status code.
- Logging terstruktur (request log + error context).
- Test otomatis (unit/integration/e2e) backend.
- API docs (OpenAPI/Swagger) untuk kontrak FE-BE.

## API Surface (Aktual, Bukan Target)
- GET / -> { message, status }

Belum ada endpoint domain lain yang aktif di app saat snapshot ini dibuat.

## Database Snapshot (Aktual)
Relasi inti yang sudah siap dipakai:
- User 1:1 VendorProfile
- VendorProfile 1:n Service
- User 1:n Booking
- Service 1:n Booking
- Booking 1:1 Payment
- Booking 1:1 Review

## Risiko Teknis Saat Ini
1. Versi Prisma CLI dan Prisma Client tidak sinkron (6.x vs 7.x), berisiko generate/runtime mismatch.
2. Endpoint bisnis belum tersedia, sehingga frontend berpotensi memakai mock lebih lama.
3. Belum ada auth guard, data sensitif berisiko saat API mulai dibuka.
4. Belum ada test suite, regresi sulit terdeteksi saat penambahan endpoint cepat.

## Aturan Eksekusi Backend Sprint Ini
1. Additive only: tambah modul baru, hindari ubah struktur yang sudah stabil tanpa alasan kuat.
2. Endpoint baru wajib punya contract response yang konsisten sejak awal.
3. Semua mutasi multi-step wajib siap untuk transaction Prisma.
4. Error handling jangan inline acak; gunakan pola terpusat per modul.
5. Setiap endpoint baru minimal punya happy-path test (atau test plan jika test belum siap).

## Prioritas Task Backend (Disesuaikan Kondisi Aktual)

### BE-01 - Stabilize fondasi dependency (P0)
Status: TODO
Output:
- Samakan versi prisma dan @prisma/client.
- Jalankan generate dan verifikasi startup bersih.
DoD:
- npm run dev jalan tanpa warning mismatch Prisma.
- Query sederhana prisma.user.findMany() berhasil.

### BE-02 - Bangun struktur modul backend (P0)
Status: TODO
Output:
- Susun folder modular minimal: auth, users, bookings/services (sesuai schema existing).
- Pasang route registry di app.
DoD:
- App memuat route modular tanpa breaking health endpoint.

### BE-03 - Implement auth baseline production (P0)
Status: TODO
Output:
- Register + login + get me + logout (token-based).
- Hash password + validasi kredensial DB.
DoD:
- Auth flow end-to-end bisa dipakai FE tanpa mock.

### BE-04 - Users API minimal (P1)
Status: TODO
Output:
- GET /users (paginated)
- GET /users/:id
- PATCH /users/:id (limited safe fields)
DoD:
- Validasi input + response shape konsisten.

### BE-05 - Vendor & service core API (P1)
Status: TODO
Output:
- CRUD VendorProfile (owner scope)
- CRUD Service milik vendor
DoD:
- Ownership check berjalan.
- Tidak bisa edit service vendor lain.

### BE-06 - Booking flow core API (P1)
Status: TODO
Output:
- Create booking
- List booking by user/vendor
- Update booking status by role
DoD:
- Aturan status transition tervalidasi.
- Query list support pagination.

### BE-07 - Payment + review baseline API (P2)
Status: TODO
Output:
- Create/update payment status
- Submit review per booking completed
DoD:
- Constraint 1 booking 1 payment/review aman di level service.

### BE-08 - Standardization layer (P1, paralel)
Status: TODO
Output:
- Helper response success/error
- AppError + middleware mapper
- Request ID + log context minimal
DoD:
- Semua endpoint baru pakai format seragam.

### BE-09 - Testing baseline (P1)
Status: TODO
Output:
- Setup test runner backend.
- Minimal smoke integration test untuk health + auth.
DoD:
- Pipeline lokal bisa jalankan test minimal.

### BE-10 - API contract docs (P2)
Status: TODO
Output:
- Dokumen endpoint aktif + payload + contoh response.
DoD:
- FE bisa integrasi tanpa membaca source code backend.

## Definisi Response Contract (Disepakati Untuk Sprint)
Semua endpoint baru disarankan pakai envelope:
- Success:
  - success: true
  - data: T
  - meta: optional
- Error:
  - success: false
  - error: { code, message, details? }

## Rencana Eksekusi 2 Minggu (Backend-only)
- Minggu 1:
  - BE-01, BE-02, BE-03
- Minggu 2:
  - BE-04, BE-05, BE-08, start BE-09

## Catatan Sinkronisasi FE-BE
Karena kamu fokus backend, target minimal agar frontend berhenti bergantung mock adalah menyelesaikan BE-03 + BE-04 + BE-06 terlebih dahulu.

## Next Action (Hari Ini)
1. Kunci versi Prisma agar sinkron.
2. Bentuk skeleton route modular.
3. Implement auth baseline (register/login/me) sebagai milestone pertama backend.
