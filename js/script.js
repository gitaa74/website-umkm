<<<<<<< HEAD
const promoButton = document.querySelector('.promo-button');
const promoText = document.querySelector('.promo-text');

promoButton.addEventListener('click', () => {
    promoText.style.display = 'block';
    promoButton.textContent = "Beli 2 Gratis 1, khusus hari ini!";
=======
const promoButton = document.querySelector("#promoButton");

promoButton.addEventListener("click", () => {
  promoButton.textContent = "Promo: Beli 2 gratis tester!";
  console.log("Promo Kopi Nusa berhasil ditampilkan.");
>>>>>>> afa515079e042ae69a2d5ed7ea5e4270d4743b70
});