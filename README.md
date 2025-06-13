# SIRESITA - Sistem Rekomendasi Wisata Sumatera

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Selamat datang di repositori frontend untuk **SIRESITA**. Proyek ini merupakan sebuah Single-Page Application (SPA) yang dibangun menggunakan React, Vite, dan Tailwind CSS, dengan fokus pada pengalaman pengguna yang modern, interaktif, dan responsif.

## 📝 Tentang Proyek

**SIRESITA** adalah sebuah platform web inovatif yang bertujuan untuk merevolusi cara pengguna menemukan dan merencanakan perjalanan wisata di Pulau Sumatera. Dengan memanfaatkan teknologi Kecerdasan Buatan (AI), aplikasi ini memberikan rekomendasi destinasi, akomodasi, dan aktivitas yang dipersonalisasi sesuai dengan preferensi unik setiap pengguna.

## ✨ Fitur Utama

- **🤖 Rekomendasi Personal Berbasis AI**: Sistem cerdas yang menganalisis minat dan preferensi pengguna untuk memberikan saran wisata yang paling relevan.
- **🗺️ Tampilan Destinasi Interaktif**: Menampilkan daftar destinasi wisata lengkap dengan informasi detail, galeri gambar, ulasan pengguna, dan lokasi di peta.
- **🚀 Navigasi dan Routing Modern**: Pengalaman navigasi yang cepat dan mulus sebagai Single-Page Application (SPA) menggunakan React Router.
- **❤️ Fitur Bookmark**: Memungkinkan pengguna untuk menyimpan destinasi favorit mereka untuk diakses kembali di kemudian hari.
- **🎨 Antarmuka Pengguna Modern**: Desain yang bersih, responsif, dan diperkaya dengan animasi halus untuk meningkatkan kenyamanan dan pengalaman pengguna.

## 🛠️ Teknologi yang Digunakan

- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Manajemen State**: React Context API
- **Deployment**: _(idcloudidcloudhosthoust,)_

## 📂 Struktur Proyek

Struktur folder pada proyek ini dirancang untuk skalabilitas dan kemudahan pemeliharaan. Berikut adalah gambaran umum fungsi dari setiap direktori utama:

- `📁 api`: Mengelola semua logika untuk berkomunikasi dengan server atau API eksternal.
- `📁 assets`: Menyimpan semua file statis seperti gambar, ikon, dan font.
- `📁 components`: Berisi komponen React yang dapat digunakan kembali (reusable).
- `📁 context`: Mengelola state global menggunakan React Context API.
- `📁 Hook`: Berisi _custom hooks_ React untuk meng-enkapsulasi logika stateful.
- `📁 pages`: Merepresentasikan halaman-halaman utama dalam aplikasi yang terhubung dengan _routing_.
- `📁 presenter`: Berisi logika presentasi yang memisahkan tanggung jawab dari komponen _view_.

Berikut adalah tampilan detail dari struktur direktori `src`:

````bash
src
├── api
│   ├── auth.js
│   ├── bookmark.js
│   ├── place.js
│   ├── ratings.js
│   └── recommendations.js
├── assets
│   ├── alamsumatera.jpg
│   └── react.svg
├── components
│   ├── common
│   │   ├── DestinationCard.jsx
│   │   ├── DestinationGrid.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SiresitaLogo.jsx
│   │   └── StarRatingInput.jsx
│   ├── layout
│   │   ├── AuthLayout.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── sections
│   │   ├── destinations.jsx
│   │   ├── Hero.jsx
│   │   ├── LoginCTA.jsx
│   │   └── ReviewForm.jsx
│   ├── GoogleAuthError.jsx
│   ├── GoogleAuthSuccess.jsx
│   ├── GoogleRegister.jsx
│   └── GoogleSignIn.jsx
├── context
│   └── AuthContext.jsx
├── Hook
│   └── useIntersectionObserver.js
├── pages
│   ├── Auth
│   │   ├── forget
│   │   │   ├── ForgetPassword.jsx
│   │   │   ├── NewPassword.jsx
│   │   │   └── OtpReset.jsx
│   │   ├── login.jsx
│   │   └── Register.jsx
│   ├── destination
│   │   ├── Alldestination.jsx
│   │   ├── DestinationDetail.jsx
│   │   └── ExploreMore.jsx
│   ├── user
│   │   ├── BookmarkPage.jsx
│   │   ├── FirstRecommendation.jsx
│   │   └── UserPage.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Home.jsx
├── presenter
│   ├── useAllDestinationPresenter.js
│   ├── useBookmarkPresenter.js
│   ├── useDestinationDetailPresenter.js
│   ├── useDestinationGridPresenter.js
│   ├── useForgetPasswordPresenter.js
│   ├── useLoginPresenter.js
│   ├── useNewPasswordPresenter.js
│   ├── useOtpResetPresenter.js
│   └── useRegisterPresenter.js
├── App.jsx
├── index.css
└── main.jsx

## 🚀 Memulai Proyek Secara Lokal

Untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda, ikuti langkah-langkah berikut.

### Prasyarat Sistem

- [Node.js](https://nodejs.org/) (disarankan versi LTS terbaru)
- [Git](https://git-scm.com/)

### Panduan Instalasi

1. **Clone repositori ini ke mesin lokal Anda:**
   Buka terminal atau Git Bash, lalu jalankan perintah berikut.

   ```bash
   git clone [https://github.com/Capstone-Project-CodingCamp2025/front-end.git](https://github.com/Capstone-Project-CodingCamp2025/front-end.git)
````

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

## 🤝 Panduan Kontribusi

Kami sangat menyambut kontribusi dari anggota tim. Untuk menjaga konsistensi dan kualitas kode, harap ikuti panduan berikut:

1. **Fork & Clone**: Lakukan _fork_ pada repositori ini dan _clone_ hasil _fork_ Anda ke mesin lokal.
2. **Buat Branch Baru**: Selalu buat _branch_ baru untuk setiap fitur atau perbaikan yang Anda kerjakan.

   ```bash
   git checkout -b nama-fitur-atau-perbaikan
   ```

3. **Lakukan Perubahan**: Tulis kode Anda dan pastikan untuk mengikuti standar coding yang telah disepakati.
4. **Commit Perubahan**: Lakukan _commit_ dengan pesan yang jelas dan deskriptif.

   ```bash
   git commit -m "feat: Menambahkan fitur otentikasi pengguna"
   ```

5. **Push ke Branch Anda**: _Push_ perubahan ke _branch_ Anda di repositori hasil _fork_.

   ```bash
   git push origin nama-fitur-atau-perbaikan
   ```

6. **Buat Pull Request**: Buka repositori utama dan buat _Pull Request_ (PR) dari _branch_ Anda. Pastikan untuk menjelaskan perubahan yang Anda buat dalam deskripsi PR.

### Aturan Penting

- Pastikan Anda adalah anggota tim yang terdaftar. Jika Anda bukan anggota tim tetapi ingin berkontribusi, silakan diskusikan terlebih dahulu melalui _Issues_.
- Selalu gunakan akun GitHub asli Anda.
- Jaga lingkungan kerja yang positif dan hindari aktivitas yang tidak pantas dalam repositori.

### 📜 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.

---

_Dokumentasi ini terakhir diperbarui pada 12 Juni 2025._
