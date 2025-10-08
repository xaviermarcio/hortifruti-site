// ==============================
// MENU MOBILE
// ==============================
const btnMenu = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (btnMenu && mobileMenu) {
  btnMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// ==============================
// CARROSSEL PRINCIPAL (fade + zoom + autoplay + pausa ao interagir)
// ==============================
const slides = document.querySelectorAll('#carousel .slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const indicatorsContainer = document.getElementById('indicators');

let currentSlide = 0;
let autoPlay;

// cria indicadores dinamicamente
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/50 hover:bg-white transition-all duration-300';
  dot.dataset.index = i;
  indicatorsContainer.appendChild(dot);
});

const indicators = indicatorsContainer.querySelectorAll('button');

function showSlide(index) {
  slides.forEach((slide, i) => {
    const img = slide.querySelector('.slide-img');

    // controle de fade e z-index
    slide.classList.toggle('opacity-100', i === index);
    slide.classList.toggle('opacity-0', i !== index);
    slide.style.zIndex = i === index ? 10 : 0;

    // adiciona zoom suave apenas na imagem ativa
    if (i === index) {
      img.classList.add('zoom-active');
    } else {
      img.classList.remove('zoom-active');
    }
  });

  indicators.forEach((dot, i) => {
    dot.classList.toggle('bg-red-600', i === index);
    dot.classList.toggle('bg-white/50', i !== index);
  });

  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

function startAutoPlay() {
  autoPlay = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

next.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});
prev.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});
indicators.forEach((dot) => {
  dot.addEventListener('click', () => {
    showSlide(parseInt(dot.dataset.index));
    resetAutoPlay();
  });
});

// inicializa
showSlide(0);
startAutoPlay();

// ==============================
// CARROSSEL DE PRODUTOS EXCLUSIVOS (centralizado + autoplay + indicador)
// ==============================
const carouselProdutos = document.getElementById('carouselProdutos');
const prevProdutos = document.getElementById('prevProdutos');
const nextProdutos = document.getElementById('nextProdutos');
const indicador = document.getElementById('indicadorProdutos');

if (carouselProdutos && prevProdutos && nextProdutos && indicador) {
  let indexProdutos = 0;

  // calcula largura real de cada item
  function getItemWidth() {
    const item = carouselProdutos.querySelector('div');
    if (!item) return 240;
    const style = getComputedStyle(item);
    const marginRight = parseInt(style.marginRight) || 16;
    return item.offsetWidth + marginRight;
  }

  const totalItems = carouselProdutos.children.length;

  // cria os pontos do indicador
  for (let i = 0; i < totalItems; i++) {
    const dot = document.createElement('div');
    dot.className = 'w-2.5 h-2.5 rounded-full bg-gray-300 transition-all duration-300';
    indicador.appendChild(dot);
  }
  const dots = indicador.querySelectorAll('div');

  function atualizarIndicador(index) {
    dots.forEach((dot, i) => {
      dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 ' + (i === index ? 'bg-green-700 scale-125' : 'bg-gray-300 hover:bg-gray-400');
    });
  }

  // exibe e centraliza o produto
  function showProduto(i) {
    indexProdutos = (i + totalItems) % totalItems;
    const itemWidth = getItemWidth();
    const containerWidth = carouselProdutos.offsetWidth;
    const scrollPosition = indexProdutos * itemWidth - (containerWidth - itemWidth) / 2;

    carouselProdutos.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
    atualizarIndicador(indexProdutos);
  }

  // controles
  function nextProduto() {
    showProduto(indexProdutos + 1);
  }
  function prevProduto() {
    showProduto(indexProdutos - 1);
  }

  nextProdutos.addEventListener('click', nextProduto);
  prevProdutos.addEventListener('click', prevProduto);

  // autoplay com pausa ao interagir
  let autoPlay = setInterval(nextProduto, 3000);
  carouselProdutos.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carouselProdutos.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextProduto, 3000);
  });

  showProduto(0);
}
