# SIRESITA - Sistem Rekomendasi Wisata Sumatera

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT">
</p>

<p align="center">
  Aplikasi web inovatif untuk rekomendasi wisata personal di Pulau Sumatera berbasis AI.
</p>

---

## 📚 Daftar Isi

- [SIRESITA - Sistem Rekomendasi Wisata Sumatera](#siresita---sistem-rekomendasi-wisata-sumatera)
  - [📚 Daftar Isi](#-daftar-isi)
  - [📝 Tentang Proyek](#-tentang-proyek)
  - [✨ Fitur Utama](#-fitur-utama)
  - [🛠️ Teknologi](#️-teknologi)
  - [📂 Struktur Proyek](#-struktur-proyek)
  - [🚀 Memulai Proyek](#-memulai-proyek)
    - [**1. Prasyarat**](#1-prasyarat)
    - [**2. Panduan Instalasi**](#2-panduan-instalasi)
  - [🤝 Panduan Kontribusi](#-panduan-kontribusi)
  - [📜 Lisensi](#-lisensi)

---

## 📝 Tentang Proyek

**SIRESITA** adalah sebuah platform web inovatif yang bertujuan untuk merevolusi cara pengguna menemukan dan merencanakan perjalanan wisata di Pulau Sumatera. Dengan memanfaatkan teknologi Kecerdasan Buatan (AI), aplikasi ini memberikan rekomendasi destinasi, akomodasi, dan aktivitas yang dipersonalisasi sesuai dengan preferensi unik setiap pengguna.

Proyek ini merupakan sebuah _Single-Page Application_ (SPA) yang dibangun dengan fokus pada pengalaman pengguna yang modern, interaktif, dan responsif.

---

## ✨ Fitur Utama

- **🤖 Rekomendasi Personal Berbasis AI**: Sistem cerdas yang menganalisis minat dan preferensi untuk memberikan saran wisata yang paling relevan.
- **🗺️ Tampilan Destinasi Interaktif**: Daftar destinasi lengkap dengan detail, galeri gambar, ulasan, dan integrasi peta.
- **🚀 Navigasi Modern**: Pengalaman navigasi SPA yang cepat dan mulus menggunakan React Router.
- **❤️ Fitur Bookmark**: Memungkinkan pengguna menyimpan destinasi favorit untuk diakses kembali.
- **🎨 Antarmuka Modern & Responsif**: Desain yang bersih dan intuitif, diperkaya dengan animasi untuk kenyamanan pengguna di semua perangkat.

---

## 🛠️ Teknologi

Proyek ini dibangun menggunakan ekosistem teknologi modern untuk pengembangan web yang cepat dan efisien.

- **Framework**: **React.js** untuk membangun antarmuka pengguna yang dinamis.
- **Build Tool**: **Vite** untuk lingkungan pengembangan yang super cepat.
- **Styling**: **Tailwind CSS** untuk utility-first styling yang efisien.
- **Routing**: **React Router DOM** untuk navigasi sisi klien.
- **Manajemen State**: **React Context API** untuk state management global yang sederhana.
- **Hosting**: **IDCloudHost**

---

## 📂 Struktur Proyek

Proyek ini disusun dengan arsitektur yang modular dan skalabel untuk kemudahan pemeliharaan.

```bash
src
├── api/                # Fungsi untuk komunikasi dengan REST API backend
├── assets/             # File statis (gambar, ikon, font)
├── components/         # Komponen UI Reusable (Button, Card, Navbar, Footer)
├── context/            # State management global (contoh: AuthContext)
├── hooks/              # Custom Hooks (contoh: useFetch, useAuth)
├── pages/              # Komponen yang merepresentasikan halaman
├── presenter/          # Logika presentasi (jika menggunakan pola MVP)
├── utils/              # Fungsi-fungsi bantuan
├── App.jsx             # Komponen root aplikasi
├── main.jsx            # Entry point aplikasi
└── index.css           # Konfigurasi dasar Tailwind CSS
```

---

## 🚀 Memulai Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal.

### **1. Prasyarat**

Pastikan perangkat Anda telah ter-install:

- [Node.js](https://nodejs.org/) (versi LTS v18 atau lebih baru)
- [Git](https://git-scm.com/)

### **2. Panduan Instalasi**

1. **Clone Repositori**

   ```bash
   git clone [[https://github.com/Capstone-Project-CodingCamp2025/front-end.git]
   ```

2. **Masuk ke direktori proyek:**

   ```bash
   cd front-end
   ```

3. **Buka proyek di IDE favorit Anda (opsional):**
   Misalnya, menggunakan Visual Studio Code.

   ```bash
   code .
   ```

4. **Instal semua dependensi proyek:**
   Perintah ini akan mengunduh semua library yang dibutuhkan oleh proyek.

   ```bash
   npm install
   ```

5. **Jalankan server pengembangan:**
   Proyek akan berjalan dalam mode _development_ dan dapat diakses secara default di `http://localhost:5173`.

   ```bash
   npm run dev
   ```

---

## 🤝 Panduan Kontribusi

Kontribusi dari anggota tim sangat kami harapkan. Untuk menjaga kualitas kode, harap ikuti panduan berikut.

1. **Buat Branch Baru**: Selalu buat _branch_ baru untuk setiap fitur atau perbaikan. Gunakan format `nama-fitur` atau `jenis/nama-fitur` (contoh: `feat/user-authentication`).

   ```bash
   git checkout -b feat/user-authentication
   ```

2. **Commit Perubahan**: Gunakan [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) untuk pesan commit yang jelas.

   - `feat`: untuk fitur baru.
   - `fix`: untuk perbaikan bug.
   - `docs`: untuk perubahan dokumentasi.
   - `style`: untuk perubahan format kode.
   - `refactor`: untuk refactoring kode.
   - `chore`: untuk tugas-tugas rutin (build, update dependensi).

   ```bash
   git commit -m "feat: menambahkan fitur login dengan Google"
   ```

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah **Lisensi MIT**. Lihat file `LICENSE` untuk informasi lebih lanjut.

---

_Dokumentasi ini terakhir diperbarui pada 13 Juni 2025._
