"use strict";

console.log("P09 JavaScript aktif");

document.querySelectorAll(".nav").forEach((nav) => {
  const toggle = nav.querySelector(".nav-toggle");
  const menu = nav.querySelector(".nav-list");

  if (!toggle || !menu) return;

  const setMenuOpen = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
    menu.classList.toggle("is-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });
});


const produkUmkm = [
  { nama: "Butterscotch coffe", kategori: "Kopi", harga: 75000, stok: 15 , unggulan: true},
  { nama: "Sea salt caramel mattchiato", kategori: "Kopi", harga: 70000, stok: 8 , unggulan: true},
  { nama: "Paket teman senja", kategori: "Bundling", harga: 155000, stok: 20 , unggulan: true},
  { nama: "Paket kenalan kopi", kategori: "Bundling", harga: 130000, stok: 2, unggulan: false}
];

console.table(produkUmkm);

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}
console.log(formatRupiah(85000));

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}
console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

function labelKategori(kategori) {
  switch (kategori.toLowerCase()) {
    case "kopi":
      return "Produk kopi pilihan";
    case "bundling":
      return "Paket hemat";
    default:
      return kategori;
  }
}

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = labelKategori(produk.kategori);

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  const actionNote = document.createElement("p");
  actionNote.classList.add("action-note");
  actionNote.textContent = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

  card.append(title, category, price, stock, actionNote);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori "${kategori}".`;
  return empty;
}

function renderProduk(kategoriAktif = "semua") {
  const produkGrid = document.querySelector("#produk-grid") || document.querySelector("#produk-dinamis");
  const produkStatus = document.querySelector("#produk-status") || document.querySelector("#produk-ringkasan");
  const produkUnggulanEl = document.querySelector("#produk-unggulan");

  if (!produkGrid) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const filterLower = kategoriAktif.toLowerCase();
  const produkTampil = filterLower === "semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori.toLowerCase() === filterLower);

  produkGrid.replaceChildren();

  if (produkUnggulanEl) {
    const unggulan = produkUmkm.find((produk) => produk.unggulan === true && produk.stok > 0);
    produkUnggulanEl.textContent = unggulan
      ? `Produk unggulan: ${unggulan.nama}`
      : "Belum ada produk unggulan.";
  }

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    if (produkStatus) produkStatus.textContent = "0 produk ditemukan.";
    console.log("Render kategori:", kategoriAktif);
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  if (produkStatus) {
    const jumlahTersedia = produkTampil.filter((p) => p.stok > 0).length;
    produkStatus.textContent = `${produkTampil.length} produk ditampilkan (${jumlahTersedia} tersedia dari ${produkUmkm.length} data).`;
  }

  console.log("Render kategori:", kategoriAktif);
  console.table(produkTampil);
}

produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

document.addEventListener("DOMContentLoaded", () => {
  const tombolFilter = document.querySelectorAll("[data-filter]");

  tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", (event) => {
      const tombolAktif = event.currentTarget;
      const kategori = tombolAktif.dataset.filter || "semua";

      tombolFilter.forEach((item) => item.classList.remove("is-active"));
      tombolAktif.classList.add("is-active");

      renderProduk(kategori);
    });
  });

  renderProduk("semua");
});