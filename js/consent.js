// js/consent.js
(() => {
  "use strict";

  const BRAND = {
    green: "#14532d",
    green2:"#166534",
    red:   "#dc2626",
    white: "#ffffff",
    text:  "#111827"
  };

  function buildSimpleBanner() {
    const wrap = document.createElement("div");
    wrap.className = "larose-cookie-banner";
    wrap.innerHTML = `
      <p>
        <strong>Cookies:</strong> usamos cookies para melhorar sua experiência de navegação. 
        Ao continuar, você concorda com nossa 
        <a href="/privacidade">política de privacidade</a>.
      </p>
      <div class="larose-cookie-actions">
        <button class="btn-accept">ACEITAR TODOS</button>
        <button class="btn-custom">CUSTOMIZAR</button>
        <button class="btn-deny">NEGAR</button>
      </div>
    `;
    return wrap;
  }

  function buildCustomModal() {
    const modal = document.createElement("div");
    modal.className = "larose-cookie-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Preferências de Cookies</h3>
        <label>
          <input type="checkbox" checked disabled> Necessários (sempre ativos)
        </label>
        <label>
          <input type="checkbox" class="opt-analytics"> Analíticos
        </label>
        <label>
          <input type="checkbox" class="opt-marketing"> Marketing
        </label>
        <div class="modal-actions">
          <button class="btn-save">Salvar Preferências</button>
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
        position: fixed;
        bottom: 0; left: 0;
        width: 100%;
        background: #f9fafb;
        color: ${BRAND.text};
        padding: 12px 18px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        z-index: 9999;
        font-size: 14px;
        border-top: 1px solid #e5e7eb;
      }
      .larose-cookie-banner p { margin: 0; text-align: center; }
      .larose-cookie-banner a {
        color: ${BRAND.red}; text-decoration: underline; font-weight: 600;
      }
      .larose-cookie-actions {
        display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
      }
      .larose-cookie-banner button {
        border: none; border-radius: 6px;
        padding: 6px 14px; font-weight: 600;
        cursor: pointer; transition: background .2s;
      }
      .btn-accept { background: ${BRAND.green}; color: ${BRAND.white}; }
      .btn-accept:hover { background: ${BRAND.green2}; }
      .btn-custom { background: ${BRAND.text}; color: ${BRAND.white}; }
      .btn-custom:hover { background: #374151; }
      .btn-deny { background: ${BRAND.red}; color: ${BRAND.white}; }
      .btn-deny:hover { background: #ef4444; }

      /* Modal */
      .larose-cookie-modal {
        position: fixed; inset: 0; background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
      }
      .modal-content {
        background: white; padding: 20px; border-radius: 8px;
        max-width: 400px; width: 90%;
      }
      .modal-content h3 { margin-top: 0; }
      .modal-actions {
        display: flex; gap: 10px; justify-content: flex-end; margin-top: 15px;
      }
      .modal-actions button { padding: 6px 12px; border-radius: 6px; }
      .btn-save { background: ${BRAND.green}; color: ${BRAND.white}; }
      .btn-close { background: #e5e7eb; color: ${BRAND.text}; }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyle();
    const banner = buildSimpleBanner();
    document.body.appendChild(banner);

    const btnAccept = banner.querySelector(".btn-accept");
    const btnDeny = banner.querySelector(".btn-deny");
    const btnCustom = banner.querySelector(".btn-custom");

    btnAccept.addEventListener("click", () => {
      alert("Você aceitou todos os cookies (protótipo).");
      banner.remove();
    });

    btnDeny.addEventListener("click", () => {
      alert("Você negou todos os cookies (exceto necessários).");
      banner.remove();
    });

    btnCustom.addEventListener("click", () => {
      const modal = buildCustomModal();
      document.body.appendChild(modal);

      modal.querySelector(".btn-close").addEventListener("click", () => {
        modal.remove();
      });

      modal.querySelector(".btn-save").addEventListener("click", () => {
        const analytics = modal.querySelector(".opt-analytics").checked;
        const marketing = modal.querySelector(".opt-marketing").checked;
        alert(`Preferências salvas (protótipo): Analytics=${analytics}, Marketing=${marketing}`);
        modal.remove();
        banner.remove();
      });
    });
  });
})();
