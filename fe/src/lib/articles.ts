export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  takeaway: string;
};

/** Original sample editorial content for the redesign, pending client review. */
export const articles: Article[] = [
  {
    slug: "satu-bahan-banyak-cerita",
    category: "Inspirasi Menu",
    title: "Satu bahan, banyak cerita di meja.",
    excerpt:
      "Ide menu yang berkesan tidak selalu dimulai dari bahan baru. Kadang, cukup melihat bahan yang sudah Anda kenal dengan cara berbeda.",
    readTime: "3 menit baca",
    image: "/images/craft-chef-plating-v1.webp",
    imageAlt: "Chef menata sajian dengan teliti di dapur bercahaya hangat",
    intro:
      "Di dapur yang sibuk, bahan yang serbaguna memberi ruang untuk berkreasi. Satu potongan daging bisa menjadi titik awal untuk beberapa sajian dengan karakter yang berbeda.",
    sections: [
      {
        heading: "Mulai dari karakter, bukan sekadar nama menu.",
        paragraphs: [
          "Sebelum memikirkan tampilan piring, kenali pengalaman yang ingin Anda hadirkan. Apakah menu itu hangat dan akrab, ringan untuk makan siang, atau menjadi sajian utama untuk dinikmati perlahan? Jawabannya membantu menentukan potongan, bumbu, dan cara penyajian.",
          "Irisan tipis daging sapi, misalnya, bisa tampil sebagai rice bowl dengan bawang, sajian panggang untuk dinikmati bersama, atau isian sandwich. Bahan dasarnya serupa, tetapi pendamping dan cara menyajikannya membangun cerita yang berbeda.",
        ],
      },
      {
        heading: "Beri setiap sajian identitasnya sendiri.",
        paragraphs: [
          "Keserbagunaan bahan bukan berarti semua menu harus terasa sama. Bedakan arah rasa dan teksturnya: pendamping yang renyah, saus yang menjadi ciri khas, atau sentuhan asam yang membuat sajian terasa lebih segar.",
          "Mulailah dengan dua atau tiga ide yang paling dekat dengan identitas usaha Anda. Uji dalam porsi kecil dan catat bahan pendampingnya. Pilih kombinasi yang mudah dijelaskan kepada pelanggan sekaligus masuk akal untuk dikerjakan oleh tim dapur.",
        ],
      },
      {
        heading: "Menu yang menarik juga perlu nyaman dikerjakan.",
        paragraphs: [
          "Bayangkan bagaimana sajian itu dibuat pada jam pelayanan paling ramai. Peralatan apa yang dipakai? Apakah persiapannya berbagi langkah dengan menu lain? Bagian mana yang baru diselesaikan ketika pesanan masuk? Pertanyaan sederhana ini membantu menyaring ide sebelum menu diperkenalkan.",
          "Akhirnya, ide terbaik adalah yang punya rasa, karakter, dan alur kerja yang dapat diulangi. Bahan pilihan memberi titik awal; perhatian tim dapur membuatnya menjadi pengalaman yang ingin dipesan kembali.",
        ],
      },
    ],
    takeaway:
      "Bahan yang sama bisa membuka banyak kemungkinan. Beri setiap menu alasan yang jelas untuk hadir di meja pelanggan.",
  },
  {
    slug: "memilih-potongan-untuk-menu-andalan",
    category: "Kenali Bahan",
    title: "Potongan yang tepat untuk menu andalan.",
    excerpt:
      "Dari steak hingga irisan untuk grill, setiap potongan membawa karakter tersendiri. Mulai pilihan Anda dari cara bahan itu akan disajikan.",
    readTime: "3 menit baca",
    image: "/images/product-tenderloin.webp",
    imageAlt: "Potongan tenderloin bermarbling di atas slate gelap",
    intro:
      "Memilih daging untuk usaha kuliner bukan hanya soal menemukan nama potongan yang populer. Pilihan yang tepat berawal dari hubungan antara bahan, metode pengolahan, dan pengalaman makan yang Anda inginkan.",
    sections: [
      {
        heading: "Mulai dari bentuk sajian.",
        paragraphs: [
          "Steak utuh, irisan untuk grill, dan potongan untuk masakan berkuah memiliki kebutuhan yang berbeda. Tentukan dulu bentuk sajian, perkiraan porsi, serta cara pelanggan menikmatinya. Setelah itu, barulah bandingkan pilihan bahan yang tersedia.",
          "Jika Anda menyiapkan menu berbasis irisan, konsistensi bentuk dan ketebalan menjadi bagian penting dari pengalaman di meja. Untuk sajian utuh, ukuran tiap porsi dan penampilannya ketika disajikan mungkin menjadi perhatian yang lebih besar.",
        ],
      },
      {
        heading: "Perjelas spesifikasi sebelum memesan.",
        paragraphs: [
          "Nama produk saja belum selalu menggambarkan seluruh kebutuhannya. Tanyakan bentuk produk, ukuran kemasan, kondisi penyimpanan yang tercantum pada label, serta pilihan pemotongan bila tersedia. Sampaikan juga metode pengolahan yang akan dipakai oleh tim Anda.",
          "Untuk produk meltique, pahami keterangan produknya dan bedakan dari potongan daging lainnya. Informasi yang jelas membantu dapur mengembangkan menu dan menyampaikan deskripsi yang tepat kepada pelanggan.",
        ],
      },
      {
        heading: "Uji di dapur Anda sendiri.",
        paragraphs: [
          "Peralatan, resep, dan urutan kerja setiap dapur berbeda. Jika memungkinkan, lakukan percobaan sebelum menetapkan bahan untuk menu utama. Catat bentuk sajian, kemudahan persiapan, dan tanggapan tim terhadap hasilnya.",
          "Gunakan catatan itu sebagai bahan diskusi dengan pemasok. Percakapan yang spesifik tentang kebutuhan menu biasanya lebih berguna daripada hanya menanyakan produk mana yang paling banyak dicari.",
        ],
      },
    ],
    takeaway:
      "Mulai dari menu yang ingin Anda sajikan, lalu cari spesifikasi bahan yang mendukungnya. Nama potongan hanyalah awal percakapan.",
  },
  {
    slug: "ritme-pasokan-dapur",
    category: "Catatan Usaha",
    title: "Dapur yang tenang dimulai dari pasokan yang terencana.",
    excerpt:
      "Catatan kebutuhan yang rapi dan komunikasi yang jelas membantu tim dapur lebih siap menghadapi hari-hari yang ramai.",
    readTime: "3 menit baca",
    image: "/images/craft-butcher-hands-v1.webp",
    imageAlt: "Butcher mempersiapkan potongan daging di meja kerja kayu",
    intro:
      "Di balik pelayanan yang terasa lancar, sering kali ada kebiasaan sederhana yang dilakukan sebelum dapur mulai sibuk: mencatat kebutuhan, memeriksa persediaan, dan menyamakan informasi dengan pemasok.",
    sections: [
      {
        heading: "Kenali pola kebutuhan Anda.",
        paragraphs: [
          "Mulai dengan melihat menu yang paling sering dipesan dan hari yang biasanya lebih ramai. Pisahkan kebutuhan rutin dari kebutuhan khusus, seperti pesanan katering atau acara yang sudah dijadwalkan. Catatan ini memberi gambaran yang lebih jelas daripada mengandalkan ingatan.",
          "Libatkan orang yang menerima barang dan orang yang menggunakannya. Perbedaan informasi antara kedua pihak sering baru terlihat ketika bahan akan dipakai. Satu catatan bersama membantu mengurangi kebingungan tersebut.",
        ],
      },
      {
        heading: "Buat pesanan mudah dipahami.",
        paragraphs: [
          "Sampaikan nama produk, jumlah, satuan, spesifikasi, lokasi, dan kebutuhan jadwal dalam satu pesan yang rapi. Bila ada perubahan, tandai bagian yang berubah agar tim pemasok tidak perlu menebak pesanan mana yang menjadi acuan terakhir.",
          "Konfirmasikan ketersediaan dan pengiriman bersama tim pemasok. Hindari menganggap jadwal sebelumnya otomatis berlaku untuk pesanan berikutnya, terutama ketika kebutuhan atau lokasi penerimaan berubah.",
        ],
      },
      {
        heading: "Sediakan ruang untuk penyesuaian.",
        paragraphs: [
          "Menu baru, acara mendadak, dan pola kunjungan pelanggan dapat mengubah kebutuhan dapur. Karena itu, komunikasi tidak berhenti setelah barang dipesan. Beri tahu pemasok jika ada rencana yang memerlukan persiapan berbeda.",
          "Evaluasi catatan pemesanan secara berkala bersama tim. Pertahankan kebiasaan yang membantu dan sederhanakan bagian yang menyulitkan. Perencanaan yang baik seharusnya membuat pekerjaan sehari-hari lebih jelas, bukan menambah kerumitan.",
        ],
      },
    ],
    takeaway:
      "Pasokan yang terencana dibangun dari informasi yang jelas dan percakapan yang berkelanjutan.",
  },
];

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);
