// Data statis untuk Portal Desa Salamrejo
// Data ini digunakan sebagai fallback sebelum integrasi API SheetDB

export const desaInfo = {
  nama: "Kalurahan Salamrejo",
  kapanewon: "Sentolo",
  kabupaten: "Kulon Progo",
  provinsi: "Daerah Istimewa Yogyakarta",
  tagline: "Menyatukan 8 Pedukuhan, Membangun Satu Desa yang Berdaya",
  sejarah: `Kalurahan Salamrejo merupakan salah satu kalurahan di Kapanewon Sentolo, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta. Nama "Salamrejo" berasal dari kata "Salam" yang berarti selamat dan "Rejo" yang berarti makmur, mencerminkan harapan warga akan kehidupan yang selamat dan sejahtera. Wilayah ini memiliki sejarah panjang yang berakar dari Kademangan Jlegong, sebuah kawasan administrasi tradisional Jawa yang kemudian berkembang menjadi kalurahan modern. Salamrejo terkenal dengan keindahan alamnya, kearifan lokal yang masih terjaga, serta potensi UMKM dan pertanian yang terus berkembang.`,
  visi: "Terwujudnya Kalurahan Salamrejo yang Maju, Mandiri, dan Berbudaya Berbasis Potensi Lokal.",
  misi: [
    "Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel.",
    "Mengembangkan potensi ekonomi lokal melalui pemberdayaan UMKM dan sektor pertanian.",
    "Melestarikan budaya, tradisi, dan kearifan lokal masyarakat.",
    "Meningkatkan kualitas infrastruktur desa untuk kesejahteraan warga.",
    "Mendorong partisipasi aktif masyarakat dalam pembangunan desa.",
  ],
  pemerintahan: {
    lurah: "Bapak Dani Pristiawan, S.P., M.I.P.",
    carik: "Ibu Wulan Rahmawati, S.IP.",
  },
};

export const pedukuhanList = [
  {
    id: "klebakan",
    nama: "Klebakan",
    deskripsi: "Pedukuhan dengan potensi pertanian dan kerajinan serat agel yang menjadi ciri khas wilayah ini.",
    warna: "from-emerald-500 to-green-700",
    icon: "🌾",
  },
  {
    id: "mentobayan",
    nama: "Mentobayan",
    deskripsi: "Pedukuhan yang kaya akan tradisi budaya Jawa dan memiliki komunitas petani yang aktif.",
    warna: "from-teal-500 to-emerald-700",
    icon: "🏡",
  },
  {
    id: "giyoso",
    nama: "Giyoso",
    deskripsi: "Pedukuhan dengan pemandangan alam yang indah dan potensi wisata yang sedang berkembang.",
    warna: "from-green-500 to-teal-700",
    icon: "🌿",
  },
  {
    id: "karangwetan",
    nama: "Karang Wetan",
    deskripsi: "Pedukuhan yang memiliki kekayaan kuliner tradisional dan UMKM kreatif.",
    warna: "from-lime-500 to-green-700",
    icon: "🍃",
  },
  {
    id: "kidulan",
    nama: "Kidulan",
    deskripsi: "Pedukuhan yang terkenal dengan kesenian tradisional dan gotong royong yang kuat.",
    warna: "from-emerald-600 to-green-800",
    icon: "🎋",
  },
  {
    id: "dhisil",
    nama: "Dhisil",
    deskripsi: "Pedukuhan dengan kekayaan seni budaya dan tradisi turun-temurun yang masih terjaga.",
    warna: "from-green-600 to-emerald-800",
    icon: "🎭",
  },
  {
    id: "salam",
    nama: "Salam",
    deskripsi: "Pedukuhan yang menjadi pusat kegiatan masyarakat dan memiliki potensi ekonomi yang beragam.",
    warna: "from-teal-600 to-green-800",
    icon: "🌳",
  },
  {
    id: "ngrandu",
    nama: "Ngrandu",
    deskripsi: "Pedukuhan dengan keunikan geografis dan potensi peternakan serta pertanian organik.",
    warna: "from-emerald-500 to-teal-800",
    icon: "🐃",
  },
];

// Placeholder data untuk setiap pedukuhan (akan diganti dengan data dari API)
export const pedukuhanData = {
  klebakan: {
    hero_foto: null,
    dukuh: { nama: "Bapak Mujiran", wa: "+62 815 7577 1228", peta_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7904.957523159129!2d110.21592165934038!3d-7.844855468575608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7afbcd2eb7a81f%3A0x74923160451be22a!2sKlebakan%2C%20Salamrejo%2C%20Kec.%20Sentolo%2C%20Kabupaten%20Kulon%20Progo%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1783502181514!5m2!1sid!2sid" },
    statistik: { jml_rt: 8, jml_kk: 369, laki_laki: 597, perempuan: 614 },
    umkm: [
      {
        nama: "Kerajinan Serat Agel",
        kategori: "Kerajinan",
        deskripsi: "Produk kerajinan tangan dari serat agel berkualitas tinggi yang menjadi ikon Klebakan.",
        foto: null,
        wa: "",
        lokasi: "",
      },
      {
        nama: "Olahan Pangan Lokal",
        kategori: "Makanan",
        deskripsi: "Berbagai olahan pangan dari bahan lokal yang memiliki cita rasa khas desa.",
        foto: null,
        wa: "",
        lokasi: "",
      },
      {
        nama: "Pertanian Padi Organik",
        kategori: "Pertanian",
        deskripsi: "Padi organik yang dibudidayakan secara tradisional oleh petani setempat.",
        foto: null,
        wa: "",
        lokasi: "",
      },
    ],
    galeri: [
      { judul: "Tradisi Wiwitan", kategori: "Budaya", foto: null, deskripsi: "Upacara adat sebelum masa tanam padi dimulai." },
      { judul: "Pemandangan Sawah", kategori: "Alam", foto: null, deskripsi: "Hamparan sawah hijau yang menjadi pemandangan khas pedukuhan." },
      { judul: "Kegiatan Gotong Royong", kategori: "Kegiatan", foto: null, deskripsi: "Warga bergotong royong membersihkan lingkungan pedukuhan." },
    ],
  },
  mentobayan: {
    hero_foto: null,
    dukuh: { nama: "Bapak/Ibu Dukuh Mentobayan", wa: "", peta_url: "" },
    statistik: { jml_rt: 4, jml_kk: 120, laki_laki: 260, perempuan: 250 },
    umkm: [
      { nama: "Batik Tulis Mentobayan", kategori: "Kerajinan", deskripsi: "Batik tulis dengan motif khas Mentobayan.", foto: null, wa: "", lokasi: "" },
      { nama: "Emping Melinjo", kategori: "Makanan", deskripsi: "Emping melinjo renyah buatan tangan ibu-ibu setempat.", foto: null, wa: "", lokasi: "" },
      { nama: "Pupuk Organik", kategori: "Pertanian", deskripsi: "Pupuk organik dari limbah ternak untuk pertanian berkelanjutan.", foto: null, wa: "", lokasi: "" },
    ],
    galeri: [
      { judul: "Nyadran Mentobayan", kategori: "Budaya", foto: null, deskripsi: "Tradisi nyadran yang digelar setiap tahun oleh warga." },
      { judul: "Kelompok Tani", kategori: "Kegiatan", foto: null, deskripsi: "Pertemuan rutin kelompok tani pedukuhan." },
      { judul: "Sungai Progo", kategori: "Alam", foto: null, deskripsi: "Aliran sungai Progo yang melintasi wilayah pedukuhan." },
    ],
  },
  giyoso: {
    hero_foto: null,
    dukuh: { nama: "Bapak/Ibu Dukuh Giyoso", wa: "", peta_url: "" },
    statistik: { jml_rt: 4, jml_kk: 110, laki_laki: 240, perempuan: 230 },
    umkm: [
      { nama: "Gula Kelapa", kategori: "Makanan", deskripsi: "Gula kelapa alami dari pohon kelapa tua pedukuhan.", foto: null, wa: "", lokasi: "" },
      { nama: "Anyaman Bambu", kategori: "Kerajinan", deskripsi: "Aneka produk anyaman bambu untuk keperluan rumah tangga.", foto: null, wa: "", lokasi: "" },
      { nama: "Ternak Kambing", kategori: "Pertanian", deskripsi: "Peternakan kambing sehat dengan pakan alami.", foto: null, wa: "", lokasi: "" },
    ],
    galeri: [
      { judul: "Jalan Desa Giyoso", kategori: "Alam", foto: null, deskripsi: "Jalan desa yang asri dikelilingi pepohonan rindang." },
      { judul: "Posyandu Giyoso", kategori: "Kegiatan", foto: null, deskripsi: "Kegiatan posyandu untuk ibu dan anak." },
      { judul: "Merti Dusun", kategori: "Budaya", foto: null, deskripsi: "Tradisi merti dusun sebagai bentuk syukur warga." },
    ],
  },
  karangwetan: {
    hero_foto: null,
    dukuh: { nama: "Bapak/Ibu Dukuh Karang Wetan", wa: "", peta_url: "" },
    statistik: { jml_rt: 5, jml_kk: 140, laki_laki: 300, perempuan: 290 },
    umkm: [
      { nama: "Keripik Singkong", kategori: "Makanan", deskripsi: "Keripik singkong aneka rasa yang renyah dan gurih.", foto: null, wa: "", lokasi: "" },
      { nama: "Tas Rajut", kategori: "Kerajinan", deskripsi: "Tas rajut handmade dari bahan berkualitas.", foto: null, wa: "", lokasi: "" },
      { nama: "Budidaya Lele", kategori: "Pertanian", deskripsi: "Budidaya ikan lele dengan sistem biofloc.", foto: null, wa: "", lokasi: "" },
    ],
    galeri: [
      { judul: "Karang Taruna", kategori: "Kegiatan", foto: null, deskripsi: "Kegiatan pemuda karang taruna Karang Wetan." },
      { judul: "Balai Pedukuhan", kategori: "Fasilitas", foto: null, deskripsi: "Balai pertemuan warga Karang Wetan." },
      { judul: "Kenduri Warga", kategori: "Budaya", foto: null, deskripsi: "Tradisi kenduri sebagai bentuk kebersamaan warga." },
    ],
  },
  kidulan: {
    hero_foto: null,
    dukuh: { nama: "Bapak/Ibu Dukuh Kidulan", wa: "", peta_url: "" },
    statistik: { jml_rt: 3, jml_kk: 100, laki_laki: 210, perempuan: 200 },
    umkm: [
      { nama: "Jamu Tradisional", kategori: "Makanan", deskripsi: "Jamu tradisional dari rempah-rempah pilihan.", foto: null, wa: "", lokasi: "" },
      { nama: "Batu Bata", kategori: "Kerajinan", deskripsi: "Produksi batu bata merah berkualitas tinggi.", foto: null, wa: "", lokasi: "" },
      { nama: "Sayuran Organik", kategori: "Pertanian", deskripsi: "Sayuran organik segar langsung dari kebun warga.", foto: null, wa: "", lokasi: "" },
    ],
    galeri: [
      { judul: "Gamelan Kidulan", kategori: "Budaya", foto: null, deskripsi: "Latihan gamelan oleh kelompok kesenian pedukuhan." },
      { judul: "Pekarangan Produktif", kategori: "Alam", foto: null, deskripsi: "Pemanfaatan pekarangan rumah untuk tanaman produktif." },
      { judul: "Kerja Bakti", kategori: "Kegiatan", foto: null, deskripsi: "Kerja bakti bersih desa rutin setiap Jumat pagi." },
    ],
  },
  dhisil: {
    hero_foto: null,
    dukuh: { nama: "Bapak/Ibu Dukuh Dhisil", wa: "", peta_url: "" },
    statistik: { jml_rt: 4, jml_kk: 130, laki_laki: 280, perempuan: 270 },
    umkm: [
      { nama: "Tempe Kedelai", kategori: "Makanan", deskripsi: "Tempe kedelai segar produksi rumahan yang diminati banyak orang.", foto: null, wa: "", lokasi: "" },
      { nama: "Gerabah Tradisional", kategori: "Kerajinan", deskripsi: "Gerabah tradisional untuk dekorasi dan peralatan dapur.", foto: null, wa: "", lokasi: "" },
      { nama: "Palawija", kategori: "Pertanian", deskripsi: "Budidaya palawija berkualitas dengan sistem tradisional.", foto: null, wa: "", lokasi: "" },
    ],
    galeri: [
      { judul: "Wayang Kulit", kategori: "Budaya", foto: null, deskripsi: "Pertunjukan wayang kulit dalam rangka bersih desa." },
      { judul: "Masjid Dhisil", kategori: "Fasilitas", foto: null, deskripsi: "Masjid pedukuhan yang menjadi pusat kegiatan keagamaan." },
      { judul: "Senam Pagi", kategori: "Kegiatan", foto: null, deskripsi: "Kegiatan senam pagi bersama warga setiap Minggu." },
    ],
  },
  salam: {
    hero_foto: null,
    dukuh: { nama: "Bapak/Ibu Dukuh Salam", wa: "", peta_url: "" },
    statistik: { jml_rt: 6, jml_kk: 160, laki_laki: 340, perempuan: 330 },
    umkm: [
      { nama: "Kue Tradisional", kategori: "Makanan", deskripsi: "Aneka kue tradisional Jawa untuk acara dan oleh-oleh.", foto: null, wa: "", lokasi: "" },
      { nama: "Mebel Kayu Jati", kategori: "Kerajinan", deskripsi: "Furnitur kayu jati dengan desain klasik dan modern.", foto: null, wa: "", lokasi: "" },
      { nama: "Bibit Tanaman", kategori: "Pertanian", deskripsi: "Penyedia bibit tanaman buah dan hias berkualitas.", foto: null, wa: "", lokasi: "" },
    ],
    galeri: [
      { judul: "Grebeg Salam", kategori: "Budaya", foto: null, deskripsi: "Festival tahunan yang menjadi ikon pedukuhan Salam." },
      { judul: "Lapangan Salam", kategori: "Fasilitas", foto: null, deskripsi: "Lapangan serbaguna untuk olahraga dan kegiatan warga." },
      { judul: "PKK Salam", kategori: "Kegiatan", foto: null, deskripsi: "Kegiatan PKK dalam rangka pemberdayaan ibu-ibu." },
    ],
  },
  ngrandu: {
    hero_foto: null,
    dukuh: { nama: "Bapak/Ibu Dukuh Ngrandu", wa: "", peta_url: "" },
    statistik: { jml_rt: 4, jml_kk: 115, laki_laki: 250, perempuan: 240 },
    umkm: [
      { nama: "Susu Sapi Segar", kategori: "Makanan", deskripsi: "Susu sapi segar dari peternakan lokal pedukuhan.", foto: null, wa: "", lokasi: "" },
      { nama: "Tikar Pandan", kategori: "Kerajinan", deskripsi: "Tikar pandan anyaman tangan dengan motif tradisional.", foto: null, wa: "", lokasi: "" },
      { nama: "Ternak Sapi", kategori: "Pertanian", deskripsi: "Peternakan sapi dengan manajemen modern dan pakan ternak lokal.", foto: null, wa: "", lokasi: "" },
    ],
    galeri: [
      { judul: "Padang Rumput Ngrandu", kategori: "Alam", foto: null, deskripsi: "Padang rumput hijau tempat ternak merumput." },
      { judul: "Pengajian Rutin", kategori: "Kegiatan", foto: null, deskripsi: "Pengajian rutin malam Jumat oleh warga." },
      { judul: "Tradisi Rasulan", kategori: "Budaya", foto: null, deskripsi: "Tradisi rasulan pasca panen raya sebagai bentuk syukur." },
    ],
  },
};
