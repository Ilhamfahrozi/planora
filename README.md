# Planora

Platform marketplace layanan

## Tentang Project

Planora adalah platform untuk membantu pengguna menemukan vendor event, mengelola booking, dan memantau proses acara dalam satu aplikasi.

## Fitur Utama

### Frontend (Next.js)

- Landing page modern dengan section Hero, Brand Trust, Category, How It Works, Features, Testimonial, CTA, dan Footer.
- Autentikasi user: login, register, lupa password.
- Halaman utama pengguna: dashboard, events, bookings, profile, dan settings.
- Halaman admin: manajemen user, event, dan booking.
- Integrasi API client dengan base URL yang dapat dikonfigurasi lewat env.

### Backend (Express + Prisma)

- REST API berbasis Express dengan TypeScript.
- ORM Prisma untuk akses database PostgreSQL.
- Struktur siap migration untuk skema database.
- Konfigurasi env untuk port server dan koneksi database.

## Tech Stack

### Frontend

- Next.js 16
- React 19 + TypeScript
- Tailwind CSS 4
- Zustand (state management)
- React Query + Axios (fetching dan caching data)
- NextAuth (autentikasi)

### Backend

- Node.js + TypeScript
- Express 5
- Prisma 7
- PostgreSQL

### Tooling

- npm
- tsx (watch mode backend)
- TypeScript compiler

## Panduan Clone Repo dan Menjalankan Frontend

### Persyaratan

- Node.js 18+ (disarankan LTS terbaru)
- npm

### 1. Clone repository

```bash
git clone https://github.com/Nandapratama716/planora.git
cd planora
```

### 2. Masuk ke folder frontend dan install dependency

```bash
cd frontend
npm install
```

### 3. (Opsional) Atur URL backend untuk frontend

Frontend menggunakan nilai default `http://localhost:5000` jika env belum diatur.

Jika backend kamu berjalan di URL lain, buat file `.env.local` di folder `frontend`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### 4. Jalankan frontend

```bash
npm run dev
```

Buka di browser:

- <http://localhost:3000>

Catatan: jika port 3000 sudah dipakai proses lain, Next.js otomatis pindah ke port lain (misal 3001).

## Menjalankan Backend (Opsional, untuk data API)

Jika kamu juga ingin frontend terhubung ke API lokal:

```bash
cd ../backend
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

API default berjalan di:

- <http://localhost:5000>

## Struktur Repo

- `backend/` - Node.js + TypeScript API (Express) + Prisma
- `frontend/` - Next.js app (React + TypeScript + Tailwind)
- `mobile/` - Mobile client
- `docs/` - Catatan setup / panduan

## Troubleshooting Singkat

### README tidak bisa dibuka / terasa lambat

Jika file README terasa lambat dibuka di VS Code, biasanya penyebabnya bukan isi README, tetapi indexing folder build dan dependency besar di workspace.

Yang bisa dilakukan:

- Tutup tab preview markdown yang tidak dipakai.
- Pastikan folder generated seperti `.next` tidak di-index watcher/search.
- Reload VS Code setelah build besar (`Developer: Reload Window`).
- Hindari membuka workspace saat proses dev server ganda masih berjalan.

### Frontend gagal jalan karena Next.js dev server ganda

Jika muncul pesan `Another next dev server is already running`, hentikan proses lama lalu jalankan ulang:

```bash
taskkill /PID <PID_YANG_MUNCUL> /F
npm run dev
```

### Frontend tidak bisa call API

- Pastikan backend berjalan.
- Pastikan `NEXT_PUBLIC_API_BASE_URL` sesuai URL backend kamu.
