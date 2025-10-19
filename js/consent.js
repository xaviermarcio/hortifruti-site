// js/consent.js
(() => {
  "use strict";

  const BRAND = {
    green: "#14532d",
    green2: "#166534",
    red: "#dc2626",
    white: "#ffffff",
    text: "#111827"
  };

  // === Modal principal (LGPD + Cookies) ===
  function buildConsentModal() {
    const modal = document.createElement("div");
    modal.className = "larose-lgpd-modal";
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-box animate-scale shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="lgpd-title" aria-describedby="lgpd-desc">
        <h2 class="text-lg md:text-xl font-bold text-green-900 mb-3">Privacidade e Cookies</h2>
        <p class="text-sm md:text-base text-gray-700 mb-4">
          Utilizamos dados pessoais e cookies para melhorar sua experiência no site,
          em conformidade com a <strong>LGPD</strong>. Você pode aceitar ou recusar.
        </p>
        <p class="text-xs md:text-sm text-gray-600 mb-5">
          Saiba mais em nossa 
          <a href="https://xaviermarcio.github.io/hortifruti-site/lgpd" 
             target="_blank" class="text-red-600 underline">
            Política de Privacidade
          </a>.
        </p>
        <div class="flex justify-center gap-4 mt-4">
          <button class="btn-accept px-6 py-2 rounded-lg font-semibold shadow-md">✅ Aceitar</button>
          <button class="btn-deny px-6 py-2 rounded-lg font-semibold shadow-md">❌ Recusar</button>
        </div>
      </div>
    `;
    return modal;
  }

  // === Estilos ===
  function injectStyle() {
    if (document.getElementById("larose-lgpd-style")) return;
    const style = document.createElement("style");
    style.id = "larose-lgpd-style";
    style.textContent = `
      .larose-lgpd-modal {
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: center; justify-content: center;
      }
      .modal-overlay {
        position: absolute; inset: 0; background: rgba(0,0,0,0.6);
      }
      .modal-box {
        position: relative;
        background: ${BRAND.white};
        padding: 28px;
        border-radius: 14px;
        max-width: 460px;
        width: 90%;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        text-align: center;
      }
      .btn-accept {
        background: ${BRAND.green}; color: ${BRAND.white};
        transition: all .2s;
      }
      .btn-accept:hover { background: ${BRAND.green2}; }
      .btn-deny {
        background: ${BRAND.red}; color: ${BRAND.white};
        transition: all .2s;
      }
      .btn-deny:hover { background: #ef4444; }

      /* Animação */
      .animate-scale { animation: scaleIn .35s ease; }
      @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // === Persistência ===
  function saveConsent(value) {
    localStorage.setItem("larose_cookie_consent", JSON.stringify({
      value,
      date: new Date().toISOString()
    }));
  }
  function hasConsent() {
    return localStorage.getItem("larose_cookie_consent") !== null;
  }

  // === Inicialização ===
  document.addEventListener("DOMContentLoaded", () => {
    injectStyle();
    if (hasConsent()) return;

    const modal = buildConsentModal();
    document.body.appendChild(modal);

    const btnAccept = modal.querySelector(".btn-accept");
setTimeout(()=>{ try{ (modal.querySelector('.btn-accept')||modal).focus(); }catch(e){} },0);
try{ document.body.style.overflow='hidden'; }catch(e){}
    const btnDeny = modal.querySelector(".btn-deny");
const onEsc=(e)=>{ if(e.key==='Escape'){ try{ document.body.style.overflow=''; }catch(_){ } modal.remove(); document.removeEventListener('keydown', onEsc); } }; document.addEventListener('keydown', onEsc); modal.__escHandler=onEsc;

    btnAccept.addEventListener("click", () => {
      try{ document.body.style.overflow=''; }catch(_){ } if(modal.__escHandler){ document.removeEventListener('keydown', modal.__escHandler); modal.__escHandler=null; }
saveConsent("accepted");
      modal.remove();
    });

    btnDeny.addEventListener("click", () => {
      try{ document.body.style.overflow=''; }catch(_){ } if(modal.__escHandler){ document.removeEventListener('keydown', modal.__escHandler); modal.__escHandler=null; }
saveConsent("denied");
      modal.remove();
    });
  });
})();
