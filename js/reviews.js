// ==============================
//  ARQUIVO: reviews.js
//  FUNÇÃO: Carregar avaliações do Google Maps
//  FONTE: Places API (Google)
//  AUTOR: Márcio Xavier - 2025
// ==============================
import { CONFIG } from "./config.js";

const apiKey = CONFIG.GOOGLE_API_KEY;
const placeId = CONFIG.PLACE_ID;

async function carregarAvaliacoes() {
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews&key=${apiKey}`;
  const container = document.getElementById("reviews");

  container.innerHTML = `
    <div class="text-center py-12 animate-pulse text-gray-500">
      <p>Carregando avaliações...</p>
    </div>
  `;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.error) {
      console.error("Erro:", dados.error.message);
      container.innerHTML = `
        <p class="text-red-600 font-medium text-center">
          ⚠️ Não foi possível carregar as avaliações.
        </p>
      `;
      return;
    }

    const reviews = dados.reviews || [];
    const rating = dados.rating?.toFixed(1) || "?";
    const total = dados.userRatingCount || 0;

    // Cabeçalho
    container.innerHTML = `
      <div class="text-center mb-10">
        <h3 class="text-2xl font-extrabold text-green-800">
          ⭐ Avaliação média: ${rating}/5
        </h3>
        <p class="text-gray-600 text-sm mt-1">Baseado em ${total} avaliações no Google</p>
      </div>

      <!-- Layout responsivo: carrossel no mobile / grid no desktop -->
      <div class="flex md:grid overflow-x-auto md:overflow-visible gap-6 pb-4 md:pb-0 md:grid-cols-2 no-scrollbar"></div>
    `;

    const grid = container.querySelector("div.flex");

    if (reviews.length === 0) {
      grid.innerHTML = `<p class="text-gray-500 text-center w-full">Nenhuma avaliação encontrada.</p>`;
      return;
    }

    // Criação dos cards
    reviews.slice(0, 5).forEach((r) => {
      const nome = r.authorAttribution?.displayName || "Cliente Google";
      const link = r.authorAttribution?.uri || "#";
      const texto = r.text?.text || "";
      const estrelas = "⭐".repeat(r.rating);

      const bloco = `
        <div class="min-w-[85%] md:min-w-0 md:w-auto flex-shrink-0 bg-white border border-green-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <p class="font-semibold text-green-900 mb-1">
            <a href="${link}" target="_blank" rel="noopener" class="hover:underline">${nome}</a>
          </p>
          <div class="text-yellow-500 mb-2 text-lg">${estrelas}</div>
          <p class="text-gray-700 text-sm leading-relaxed line-clamp-5">${texto}</p>
        </div>
      `;
      grid.innerHTML += bloco;
    });
  } catch (erro) {
    console.error("Erro ao buscar avaliações:", erro);
    container.innerHTML = `
      <p class="text-red-600 font-medium text-center">
        ❌ Erro de conexão com o servidor do Google.
      </p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", carregarAvaliacoes);
