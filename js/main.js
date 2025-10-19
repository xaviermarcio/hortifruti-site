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
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startAutoPlay();
    }
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
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAutoPlay();
  }
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

  let autoPlay = null;
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motionOK) autoPlay = setInterval(nextProduto, 3000);

  carouselProdutos.addEventListener('mouseenter', () => {
    if (autoPlay) clearInterval(autoPlay);
  });
  carouselProdutos.addEventListener('mouseleave', () => {
    if (motionOK) autoPlay = setInterval(nextProduto, 3000);
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
    if (item && item.__escHandler) {
      document.removeEventListener('keydown', item.__escHandler);
      item.__escHandler = null;
    }
    try {
      document.body.style.overflow = '';
    } catch (_) {}

    if (!item) return;
    item.classList.remove('zoom-ativo');
    [fundoAtivo, botaoFechar, descricaoAtiva].forEach((el) => el?.remove());
    fundoAtivo = botaoFechar = descricaoAtiva = null;
  }
}
// ==============================
// BOTÃO VOLTAR AO TOPO — APARECE NO SCROLL E SOME NO FINAL
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Mostra após 500px e esconde quando o usuário chega ao final
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 150;

      if (scrollTop > 500 && !nearBottom) {
        scrollTopBtn.classList.remove('hidden');
      } else {
        scrollTopBtn.classList.add('hidden');
      }
    });

    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ===== classe 'is-scrolled' para compatibilidade visual (comentário em minúsculas) =====
(function () {
  var header = document.querySelector('header');
  if (!header) return;
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        var scrolled = (window.pageYOffset || document.documentElement.scrollTop) > 50;
        header.classList.toggle('is-scrolled', scrolled);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== reveal on scroll com intersectionobserver (comentário em minúsculas) =====
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) {
      el.classList.add('is-in');
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    io.observe(el);
  });
})();

// ===== sincroniza classe 'menu-open' do header com o estado do menu mobile (comentários em minúsculas) =====
(function () {
  var header = document.querySelector('header');
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!header || !menuBtn || !mobileMenu) return;

  function syncHeaderMenuOpen() {
    var isHidden = mobileMenu.classList.contains('hidden');
    header.classList.toggle('menu-open', !isHidden);
  }

  // intercepta clique para sincronizar imediatamente após o toggle original
  menuBtn.addEventListener('click', function () {
    // espera o próximo frame para ler a classe atualizada
    requestAnimationFrame(syncHeaderMenuOpen);
  });

  // fecha o menu ao clicar em qualquer link do próprio menu
  mobileMenu.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    // se o projeto usa hidden para fechar, apenas remove a classe e sincroniza
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      syncHeaderMenuOpen();
    }
  });

  // sincroniza no carregamento (caso exista algum estado inicial)
  syncHeaderMenuOpen();
})();

// ===== sincroniza classe 'menu-open' do header com o estado do menu mobile (comentários em minúsculas) =====
(function () {
  var header = document.querySelector('header');
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!header || !menuBtn || !mobileMenu) return;

  function setHeaderMenuOpen(open) {
    header.classList.toggle('menu-open', !!open);
    if (open) {
      // remove shadow para evitar regra de tema claro
      header.classList.remove('shadow-lg');
      header.classList.remove('is-scrolled');
    }
  }

  menuBtn.addEventListener('click', function () {
    // o código original alterna 'hidden'; vamos conferir depois de um microtask
    setTimeout(function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      setHeaderMenuOpen(isOpen);
    }, 0);
  });

  // fecha ao clicar em um link e sincroniza
  mobileMenu.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      setHeaderMenuOpen(false);
    }
  });

  // ao redimensionar, garante estado correto
  window.addEventListener('resize', function () {
    var isOpen = !mobileMenu.classList.contains('hidden');
    setHeaderMenuOpen(isOpen);
  });

  // estado correto ao carregar
  var isOpenInit = !mobileMenu.classList.contains('hidden');
  setHeaderMenuOpen(isOpenInit);
})();

// === NAV: mobile robusto (ESC, click-fora, scroll lock, focus trap) ===
(() => {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const focusableSel = 'a, button, [tabindex]:not([tabindex="-1"])';
  let lastFocus = null;

  if (!btn || !menu) return;

  function openMenu() {
    lastFocus = document.activeElement;
    menu.classList.remove('hidden');
    if (overlay) overlay.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = menu.querySelector(focusableSel);
    first && first.focus();
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClickOutside, true);
  }

  function closeMenu() {
    menu.classList.add('hidden');
    if (overlay) overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('click', onClickOutside, true);
    lastFocus && lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') return closeMenu();
    if (e.key === 'Tab') {
      const items = [...menu.querySelectorAll(focusableSel)];
      if (!items.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function onClickOutside(e) {
    if (!menu.contains(e.target) && e.target !== btn) closeMenu();
  }

  // Integra com o handler já existente: após o toggle original, sincronizamos estado
  btn.addEventListener('click', () => {
    // aguarda DOM aplicar toggle existente
    setTimeout(() => {
      const open = !menu.classList.contains('hidden');
      open ? openMenu() : closeMenu();
    }, 0);
  });

  overlay && overlay.addEventListener('click', closeMenu);

  // Fecha ao clicar em link do próprio menu (melhor UX)
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    closeMenu();
  });
})();

// === NAV: scrollspy + aria-current + smooth ===
(() => {
  const desktop = document.querySelector('header nav[aria-label="Menu principal"]');
  const mobile = document.getElementById('mobile-menu');
  const links = [...(desktop ? desktop.querySelectorAll('a[href^="#"]') : []), ...(mobile ? mobile.querySelectorAll('a[href^="#"]') : [])];
  if (!links.length) return;

  const ids = links.map((a) => (a.getAttribute('href') || '').slice(1)).filter(Boolean);
  const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);

  function setActive(id) {
    [...links].forEach((a) => {
      const href = a.getAttribute('href') || '';
      const isCurrent = href === '#' + id;
      a.classList.toggle('underline', isCurrent);
      a.classList.toggle('underline-offset-4', isCurrent);
      if (isCurrent) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            const vis = entries.filter((en) => en.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (vis && vis.target.id) setActive(vis.target.id);
          },
          { rootMargin: '-25% 0px -60% 0px', threshold: [0.25, 0.5, 0.75] },
        )
      : null;

  targets.forEach((el) => (io ? io.observe(el) : setActive(el.id)));

  // Smooth internal navigation
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
    });
  });
})();
