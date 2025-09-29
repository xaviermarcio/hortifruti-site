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

  function buildSimpleBanner() {
    const wrap = document.createElement("div");
    wrap.className = "larose-cookie-banner shadow-lg";
    wrap.innerHTML = `
      <p class="text-sm md:text-base font-medium">
        🍪 Usamos cookies para melhorar sua experiência. 
        Ao continuar, você concorda com nossa 
        <a href="/privacidade">política de privacidade</a>.
      </p>
      <div class="larose-cookie-actions">
        <button class="btn-accept">ACEITAR</button>
        <button class="btn-custom">PERSONALIZAR</button>
        <button class="btn-deny">NEGAR</button>
      </div>
    `;
    return wrap;
  }

  function buildCustomModal() {
    const modal = document.createElement("div");
    modal.className = "larose-cookie-modal";
    modal.innerHTML = `
      <div class="modal-content shadow-xl">
        <h3 class="text-lg font-bold text-green-900 mb-4">Preferências de Cookies</h3>
        <label class="block mb-2">
          <input type="checkbox" checked disabled> Necessários (sempre ativos)
        </label>
        <label class="block mb-2">
          <input type="checkbox" class="opt-analytics"> Analíticos
        </label>
        <label class="block mb-4">
          <input type="checkbox" class="opt-marketing"> Marketing
        </label>
        <div class="modal-actions">
          <button class="btn-save">Salvar</button>
          <button class="btn-close">Cancelar</button>
        </div>
      </div>
    `;
    return modal;
  }

  function injectStyle() {
    if (document.getElementById("larose-cookie-style")) return;
    const style = document.createElement("style");
    style.id = "larose-cookie-style";
    style.textContent = `
      .larose-cookie-banner {
        position: fixed; bottom: 0; left: 0; width: 100%;
        background: white; color: ${BRAND.text};
        padding: 16px 20px; display: flex; flex-direction: column;
        gap: 12px; align-items: center; justify-content: center;
        z-index: 9999; border-top: 3px solid ${BRAND.green};
        font-family: 'Inter', sans-serif; border-radius: 10px 10px 0 0;
      }
      .larose-cookie-banner p { margin: 0; text-align: center; }
      .larose-cookie-banner a { color: ${BRAND.red}; font-weight: 600; }
      .larose-cookie-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
      .larose-cookie-banner button {
        border: none; border-radius: 8px; padding: 8px 16px;
        font-weight: 600; cursor: pointer; transition: all .2s;
      }
      .btn-accept { background: ${BRAND.green}; color: ${BRAND.white}; }
      .btn-accept:hover { background: ${BRAND.green2}; }
      .btn-custom { background: ${BRAND.text}; color: ${BRAND.white}; }
      .btn-custom:hover { background: #374151; }
      .btn-deny { background: ${BRAND.red}; color: ${BRAND.white}; }
      .btn-deny:hover { background: #ef4444; }

      .larose-cookie-modal {
        position: fixed; inset: 0; background: rgba(0,0,0,0.7);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
      }
      .modal-content {
        background: white; padding: 24px; border-radius: 12px;
        max-width: 400px; width: 90%; font-family: 'Inter', sans-serif;
      }
      .modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
      .btn-save { background: ${BRAND.green}; color: white; border-radius: 6px; padding: 6px 12px; }
      .btn-close { background: #e5e7eb; color: ${BRAND.text}; border-radius: 6px; padding: 6px 12px; }
    `;
    document.head.appendChild(style);
  }

  function saveConsent(value) {
    localStorage.setItem("larose_cookie_consent", JSON.stringify({
      value,
      date: new Date().toISOString()
    }));
  }

  function hasConsent() {
    return localStorage.getItem("larose_cookie_consent") !== null;
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyle();
    if (hasConsent()) return; // 👈 se já escolheu, não mostra de novo

    const banner = buildSimpleBanner();
    document.body.appendChild(banner);

    const btnAccept = banner.querySelector(".btn-accept");
    const btnDeny = banner.querySelector(".btn-deny");
    const btnCustom = banner.querySelector(".btn-custom");

    btnAccept.addEventListener("click", () => {
      saveConsent("accepted");
      banner.remove();
    });

    btnDeny.addEventListener("click", () => {
      saveConsent("denied");
      banner.remove();
    });

    btnCustom.addEventListener("click", () => {
      const modal = buildCustomModal();
      document.body.appendChild(modal);

      modal.querySelector(".btn-close").addEventListener("click", () => modal.remove());

      modal.querySelector(".btn-save").addEventListener("click", () => {
        const analytics = modal.querySelector(".opt-analytics").checked;
        const marketing = modal.querySelector(".opt-marketing").checked;
        saveConsent({ analytics, marketing });
        modal.remove();
        banner.remove();
      });
    });
  });
})();
