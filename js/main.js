// ==============================
// MENU MOBILE + EFEITO SCROLL HEADER
// ==============================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.querySelector('header');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    // Abre / fecha o menu
    mobileMenu.classList.toggle('hidden');

    // Atualiza o atributo aria-expanded (acessibilidade)
    const isOpen = !mobileMenu.classList.contains('hidden');
    menuBtn.setAttribute('aria-expanded', isOpen);

    // Animação suave
    if (isOpen) {
      mobileMenu.classList.add('animate-slide-down');
    } else {
      mobileMenu.classList.remove('animate-slide-down');
    }
  });
}

// ==============================
// EFEITO DE SCROLL NO HEADER
// ==============================
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('bg-green-900/95', 'shadow-lg', 'backdrop-blur-xl', 'border-none');
  } else {
    header.classList.remove('bg-green-900/95', 'shadow-lg', 'backdrop-blur-xl', 'border-none');
  }
});

// ==============================
// CARROSSEL PRINCIPAL (fade + zoom + autoplay + pausa ao interagir)
// ==============================
document.addEventListener('DOMContentLoaded', () => {
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

      // fade + z-index
      slide.classList.toggle('opacity-100', i === index);
      slide.classList.toggle('opacity-0', i !== index);
      slide.style.zIndex = i === index ? 10 : 0;

      // zoom suave na imagem ativa
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

  // 🔥 inicializa somente após DOM completo
  showSlide(0);
  startAutoPlay();
});

// ==============================
// CARROSSEL DE PRODUTOS EXCLUSIVOS
// ==============================
const carouselProdutos = document.getElementById('carouselProdutos');
const prevProdutos = document.getElementById('prevProdutos');
const nextProdutos = document.getElementById('nextProdutos');
const indicador = document.getElementById('indicadorProdutos');

if (carouselProdutos && prevProdutos && nextProdutos && indicador) {
  let indexProdutos = 0;

  function getItemWidth() {
    const item = carouselProdutos.querySelector('div');
    if (!item) return 240;
    const style = getComputedStyle(item);
    const marginRight = parseInt(style.marginRight) || 16;
    return item.offsetWidth + marginRight;
  }

  const totalItems = carouselProdutos.children.length;

  // Indicadores (pontos)
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

  function showProduto(i) {
    indexProdutos = (i + totalItems) % totalItems;
    const itemWidth = getItemWidth();
    const containerWidth = carouselProdutos.offsetWidth;
    const scrollPosition = indexProdutos * itemWidth - (containerWidth - itemWidth) / 2;

    carouselProdutos.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    atualizarIndicador(indexProdutos);
  }

  function nextProduto() {
    showProduto(indexProdutos + 1);
  }
  function prevProduto() {
    showProduto(indexProdutos - 1);
  }

  nextProdutos.addEventListener('click', nextProduto);
  prevProdutos.addEventListener('click', prevProduto);

  let autoPlay = setInterval(nextProduto, 3000);
  carouselProdutos.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carouselProdutos.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextProduto, 3000);
  });

  showProduto(0);

  // ==============================
  // EFEITO DE ZOOM INTERATIVO — PRODUTOS EXCLUSIVOS
  // ==============================
  const produtos = Array.from(carouselProdutos.querySelectorAll('img'));
  let fundoAtivo = null;
  let botaoFechar = null;
  let descricaoAtiva = null;

  produtos.forEach((img) => {
    // Seletor mais estável: todos os cartões têm essa classe
    const parentCard = img.closest('.flex-shrink-0');
    if (!parentCard) return; // segurança extra

    // Clique no desktop
    img.addEventListener('click', () => toggleZoom(parentCard, img));

    // Toque e segurar no mobile
    let pressTimer;
    img.addEventListener('touchstart', () => {
      pressTimer = setTimeout(() => toggleZoom(parentCard, img, true), 400);
    });
    img.addEventListener('touchend', () => clearTimeout(pressTimer));
    img.addEventListener('touchmove', () => clearTimeout(pressTimer));
  });

  function toggleZoom(item, img, fromTouch = false) {
    if (!item) return; // evita erro se o contêiner não for encontrado
    const ativo = item.classList.toggle('zoom-ativo');

    if (ativo) {
      // Fundo escurecido
      fundoAtivo = document.createElement('div');
      fundoAtivo.className = 'zoom-fundo';
      document.body.appendChild(fundoAtivo);

      // Descrição (ingredientes ou detalhes)
      const descricao = document.createElement('div');
      descricao.className = 'zoom-descricao';
      descricao.textContent = img.dataset.descricao || 'Produto exclusivo La Rose.';
      item.appendChild(descricao);
      descricaoAtiva = descricao;

      // Botão de fechar (X)
      botaoFechar = document.createElement('button');
      botaoFechar.className = 'zoom-close';
      botaoFechar.innerHTML = '&times;';
      item.appendChild(botaoFechar);

      // Pausa o autoplay
      clearInterval(autoPlay);

      // Eventos de fechamento
      fundoAtivo.addEventListener('click', () => fecharZoom(item));
      botaoFechar.addEventListener('click', (e) => {
        e.stopPropagation();
        fecharZoom(item);
      });

      // Fecha ao soltar o toque no mobile
      if (fromTouch) {
        item.addEventListener('touchend', () => fecharZoom(item), { once: true });
      }
    } else {
      fecharZoom(item);
    }
  }

  function fecharZoom(item) {
    if (!item) return;
    item.classList.remove('zoom-ativo');
    [fundoAtivo, botaoFechar, descricaoAtiva].forEach((el) => el?.remove());
    fundoAtivo = botaoFechar = descricaoAtiva = null;
    autoPlay = setInterval(nextProduto, 3000);
  }
}
