# Meeting Simply

Aplikasi web untuk mengelola dan memproses tugas-tugas terkait rapat.

## Persyaratan

- Node.js (v14 atau lebih tinggi)
- npm (Node Package Manager)

## Instalasi

1. Clone repository:
```bash
git clone [url-repository-anda]
cd meeting-simply
```

2. Install dependensi:
```bash
npm install
```

3. Buat file `.env` di direktori utama dan tambahkan variabel lingkungan:
```
OPENAI_API_KEY=kunci_api_openai_anda
```

## Menjalankan Aplikasi

Mulai server pengembangan:
```bash
npm start
```

Aplikasi akan tersedia di `http://localhost:3000` (atau port yang ditentukan dalam konfigurasi server Anda).

## Struktur Proyek

- `server.js` - File server utama
- `openai.js` - Integrasi API OpenAI
- `prompt.js` - Template prompt
- `pages/` - Halaman frontend
- `public/` - Aset statis
- `uploads/` - Direktori untuk file yang diunggah

## Dependensi

- express - Framework web
- dotenv - Manajemen variabel lingkungan
- multer - Penanganan unggahan file
- openai - Klien API OpenAI
- nodemon - Server pengembangan dengan auto-reload

## Lisensi

ISC 