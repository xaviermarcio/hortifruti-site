// ==============================
// CARROSSEL PRINCIPAL
// ==============================
const carousel = document.getElementById("carousel");
const slides = carousel.children.length;
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const indicators = document.querySelectorAll("[data-slide]");

let index = 0;

function showSlide(i) {
  index = (i + slides) % slides;
  carousel.style.transform = `translateX(${-index * 100}%)`;

  indicators.forEach((dot, idx) => {
    dot.classList.toggle("bg-red-600", idx === index);
    dot.classList.toggle("bg-gray-300", idx !== index);
  });
}

prevBtn.addEventListener("click", () => showSlide(index - 1));
nextBtn.addEventListener("click", () => showSlide(index + 1));
indicators.forEach(dot => {
  dot.addEventListener("click", () => showSlide(parseInt(dot.dataset.slide)));
});

// Auto play (5s)
setInterval(() => showSlide(index + 1), 5000);

// Inicia no primeiro slide
showSlide(0);


// ==============================
// CARROSSEL DE PRODUTOS EXCLUSIVOS
// ==============================
const carouselProdutos = document.getElementById("carouselProdutos");
const prevProdutos = document.getElementById("prevProdutos");
const nextProdutos = document.getElementById("nextProdutos");

nextProdutos.addEventListener("click", () => {
  carouselProdutos.scrollBy({ left: 260, behavior: "smooth" });
});

prevProdutos.addEventListener("click", () => {
  carouselProdutos.scrollBy({ left: -260, behavior: "smooth" });
});


// ==============================
// MENU MOBILE
// ==============================
const btnMenu = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (btnMenu && mobileMenu) {
  btnMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
