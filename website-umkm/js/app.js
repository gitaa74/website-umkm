"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Butterscotch coffe", kategori: "Kopi", harga: 75000, stok: 15 , deskripsi: "Kopi dengan cita rasa manis"},
  { nama: "Sea salt caramel mattchiato", kategori: "Kopi", harga: 70000, stok: 8 , deskripsi: "Perpaduan rasa asin dan manis"},
  { nama: "Paket teman senja", kategori: "Bundling", harga: 155000, stok: 20 , deskripsi: "Paket kopi untuk menemani waktu santai"},
  { nama: "Paket kenalan kopi", kategori: "Bundling", harga: 130000, stok: 2, deskripsi: "Paket pilihan untuk pencinta kopi"}
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

const labelAksi = produkUmkm.stok > 0 ? "Siap dipesan" : "Hubungi admin";

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;}

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);