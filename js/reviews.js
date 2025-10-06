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

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.error) {
      console.error("Erro:", dados.error.message);
      document.getElementById("reviews").innerHTML = `
        <p class="text-red-600 font-medium">⚠️ Não foi possível carregar as avaliações.</p>
      `;
      return;
    }

    const reviews = dados.reviews || [];
    const container = document.getElementById("reviews");

    container.innerHTML = `
      <h2 class="text-3xl font-extrabold text-green-800 mb-8">
        ⭐ Avaliações (${dados.rating?.toFixed(1) || "?"}/5)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
    `;

    const grid = container.querySelector("div.grid");

    if (reviews.length === 0) {
      grid.innerHTML = `<p class="text-gray-600 col-span-2 text-center">Nenhuma avaliação encontrada.</p>`;
      return;
    }

    // Exibir até 4 ou 5 comentários, ajustando ao layout lado a lado
    reviews.slice(0, 4).forEach((r) => {
      const nome = r.authorAttribution?.displayName || "Cliente Google";
      const link = r.authorAttribution?.uri || "#";
      const texto = r.text?.text || "";
      const estrelas = "⭐".repeat(r.rating);

      const bloco = `
        <div class="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
          <p class="font-semibold text-green-900 mb-1">
            <a href="${link}" target="_blank" rel="noopener" class="hover:underline">${nome}</a>
          </p>
          <p class="text-yellow-500 mb-3 text-lg">${estrelas}</p>
          <p class="text-gray-700 text-sm leading-snug">${texto}</p>
        </div>
      `;
      grid.innerHTML += bloco;
    });
  } catch (erro) {
    console.error("Erro ao buscar avaliações:", erro);
    document.getElementById("reviews").innerHTML = `
      <p class="text-red-600 font-medium">❌ Erro de conexão com o servidor do Google.</p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", carregarAvaliacoes);
