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

  // === Modal principal LGPD ===
  function buildConsentModal() {
    const modal = document.createElement("div");
    modal.className = "larose-lgpd-modal";
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-box animate-scale shadow-2xl">
        <h2 class="text-lg md:text-xl font-bold text-green-900 mb-3">Atenção</h2>
        <p class="text-sm md:text-base text-gray-700 mb-3">
          Para continuarmos é importante que você saiba que precisaremos solicitar alguns dados pessoais.
        </p>
        <p class="text-sm md:text-base text-green-800 font-bold mb-3">Mas fique tranquilo!</p>
        <p class="text-sm md:text-base text-gray-700 mb-3">
          Conforme o Decreto Distrital nº 45.771/2024 (aplicação da LGPD no Distrito Federal), 
          seus dados serão mantidos em segurança.
        </p>
        <p class="text-xs md:text-sm text-gray-600 mb-5">
          Para saber mais, acesse: <br>
          <a href="https://xaviermarcio.github.io/hortifruti-site/" target="_blank" class="text-red-600 underline">
            https://xaviermarcio.github.io/hortifruti-site//lgpd
          </a>
        </p>
        <div class="flex justify-center gap-4 mt-4">
          <button class="btn-accept px-6 py-2 rounded-lg font-semibold shadow-md">✅ Aceitar</button>
          <button class="btn-deny px-6 py-2 rounded-lg font-semibold shadow-md">❌ Negar</button>
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
        max-width: 520px;
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
    const btnDeny = modal.querySelector(".btn-deny");

    btnAccept.addEventListener("click", () => {
      saveConsent("accepted");
      modal.remove();
    });

    btnDeny.addEventListener("click", () => {
      saveConsent("denied");
      modal.remove();
    });
  });
})();
