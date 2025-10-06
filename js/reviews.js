// ==============================
//  ARQUIVO: reviews.js
//  FUNÇÃO: Carregar avaliações do Google Maps
//  FONTE: Places API (Google)
//  AUTOR: Márcio Xavier - 2025
// ==============================
import { CONFIG } from './config.js';

const apiKey = CONFIG.GOOGLE_API_KEY;
const placeId = CONFIG.PLACE_ID;

async function carregarAvaliacoes() {
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews&key=${apiKey}`;
  const container = document.getElementById('reviews');

  // Estado inicial
  container.innerHTML = `
    <div class="text-center py-12 text-gray-500 animate-pulse">
      <p>Carregando avaliações...</p>
    </div>
  `;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.error) {
      console.error('Erro:', dados.error.message);
      container.innerHTML = `
        <p class="text-red-600 font-medium text-center">
          ⚠️ Não foi possível carregar as avaliações.
        </p>
      `;
      return;
    }

    const reviews = dados.reviews || [];
    const rating = dados.rating?.toFixed(1) || '?';
    const total = dados.userRatingCount || 0;

    // Cabeçalho com estrela e verde institucional
    container.innerHTML = `
  <div class="text-center mb-10 w-full">
    <!-- Cabeçalho -->
    <div class="inline-flex flex-col items-center justify-center w-full">
      <div class="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" class="w-6 h-6 shrink-0">
          <path d="M12 .587l3.668 7.429 8.2 1.193-5.934 5.781 1.402 8.171L12 18.896l-7.336 3.865 1.402-8.171L.132 9.209l8.2-1.193z"/>
        </svg>
        <h3 class="text-lg sm:text-xl md:text-2xl font-extrabold text-green-900 leading-snug">
          Avaliação média: ${rating}/5
        </h3>
      </div>

      <!-- Linha do total de avaliações -->
      <div class="w-full mt-2">
        <p class="text-gray-800 text-sm sm:text-base font-medium leading-relaxed tracking-wide">
          Baseado em ${total} avaliações no Google
        </p>
      </div>
    </div>
  </div>

  <!-- Grid das avaliações -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
`;

    const grid = container.querySelector('div.grid');

    if (reviews.length === 0) {
      grid.innerHTML = `<p class="text-gray-600 text-center w-full">Nenhuma avaliação encontrada.</p>`;
      return;
    }

    // Criação dos cards
    reviews.slice(0, 5).forEach((r) => {
      const nome = r.authorAttribution?.displayName || 'Cliente Google';
      const link = r.authorAttribution?.uri || '#';
      const texto = r.text?.text || '';
      const estrelas = '⭐'.repeat(r.rating);

      const bloco = `
        <div class="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p class="font-semibold text-green-900 mb-1">
            <a href="${link}" target="_blank" rel="noopener" class="hover:text-red-600 transition">
              ${nome}
            </a>
          </p>
          <div class="text-yellow-500 mb-2 text-lg">${estrelas}</div>
          <p class="text-gray-800 text-sm leading-relaxed">${texto}</p>
        </div>
      `;
      grid.innerHTML += bloco;
    });
  } catch (erro) {
    console.error('Erro ao buscar avaliações:', erro);
    container.innerHTML = `
      <p class="text-red-600 font-medium text-center">
        ❌ Erro de conexão com o servidor do Google.
      </p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', carregarAvaliacoes);
