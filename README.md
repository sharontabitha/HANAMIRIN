# Hanami Mandarin

Aplikasi belajar Mandarin untuk materi HSK 1–3. Hanami dibuat sebagai Progressive Web App (PWA), sehingga dapat dipasang dari browser pada perangkat yang mendukung instalasi aplikasi web.

## Fitur

- Materi, kosakata, dan latihan Mandarin tingkat HSK 1–3.
- Notebook kosakata dan progres belajar.
- Progress disimpan di browser; sinkronisasi Supabase bersifat opsional.
- PWA dengan service worker untuk membantu membuka aplikasi saat offline.

## Menjalankan secara lokal

Persyaratan: Node.js dan npm.

```bash
npm install
npm run dev
```

Vite akan menampilkan alamat lokal untuk membuka aplikasi.

## Build dan preview

```bash
npm run build
npm run preview
```

Hasil build tersedia di folder `dist`. Deploy folder tersebut ke hosting static yang mendukung HTTPS dan fallback SPA agar instalasi PWA dan navigasi langsung berfungsi.

## Memasang sebagai aplikasi

Buka situs yang sudah di-deploy melalui HTTPS, lalu pilih **Install app**. Di iPhone atau iPad, buka situs di Safari, pilih **Share**, lalu **Add to Home Screen**. Dukungan instalasi bergantung pada browser dan perangkat.

## Supabase (opsional)

Aplikasi tetap dapat digunakan tanpa Supabase; data akan disimpan di browser. Untuk mengaktifkan sinkronisasi, ikuti panduan [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) dan gunakan skema [supabase/schema.sql](./supabase/schema.sql).

Jangan commit file `.env` atau menggunakan Supabase service-role key di frontend. Variabel `VITE_*` masuk ke build browser; gunakan hanya URL proyek dan publishable/anon key, dengan Row Level Security dikonfigurasi dengan benar.

## Teknologi

- React dan Vite
- Supabase JS (opsional)
- Lucide React
