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

// ==============================
// CARROSSEL PRINCIPAL
// ==============================
const carousel = document.getElementById("carousel");
const slides = carousel ? carousel.children.length : 0;
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const indicatorsContainer = document.getElementById("indicators"); // <--- usei id fixo

if (carousel && prevBtn && nextBtn && indicatorsContainer) {
  indicatorsContainer.innerHTML = "";

  // cria bolinhas
  for (let i = 0; i < slides; i++) {
    const dot = document.createElement("button");
    dot.className = "w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-300 transition";
    dot.dataset.slide = i;
    indicatorsContainer.appendChild(dot);
  }

  const indicators = indicatorsContainer.querySelectorAll("button");
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

  setInterval(() => showSlide(index + 1), 5000); // autoplay
  showSlide(0);
}

// ==============================
// CARROSSEL DE PRODUTOS EXCLUSIVOS
// ==============================
const carouselProdutos = document.getElementById("carouselProdutos");
const prevProdutos = document.getElementById("prevProdutos");
const nextProdutos = document.getElementById("nextProdutos");
const indicadoresProdutos = document.getElementById("indicadoresProdutos");

if (carouselProdutos && prevProdutos && nextProdutos && indicadoresProdutos) {
  const produtos = carouselProdutos.children.length;
  let indexProdutos = 0;

  indicadoresProdutos.innerHTML = ""; // evita duplicar

  // cria bolinhas
  for (let i = 0; i < produtos; i++) {
    const dot = document.createElement("button");
    dot.className = "w-3 h-3 rounded-full bg-gray-300 transition";
    dot.dataset.slide = i;
    indicadoresProdutos.appendChild(dot);
    dot.addEventListener("click", () => showProduto(i));
  }

  const dotsProdutos = indicadoresProdutos.querySelectorAll("button");

  function showProduto(i) {
    indexProdutos = (i + produtos) % produtos;
    const itemWidth = carouselProdutos.children[0].offsetWidth + 16; // largura + gap
    carouselProdutos.scrollTo({ left: indexProdutos * itemWidth, behavior: "smooth" });

    dotsProdutos.forEach((dot, idx) => {
      dot.classList.toggle("bg-red-600", idx === indexProdutos);
      dot.classList.toggle("bg-gray-300", idx !== indexProdutos);
    });
  }

  function nextProduto() {
    showProduto(indexProdutos + 1);
  }

  function prevProduto() {
    showProduto(indexProdutos - 1);
  }

  nextProdutos.addEventListener("click", nextProduto);
  prevProdutos.addEventListener("click", prevProduto);

  setInterval(nextProduto, 4000); // autoplay
  showProduto(0);
}
