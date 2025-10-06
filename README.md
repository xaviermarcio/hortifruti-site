# 🥬 Hortifruti La Rose — Website Oficial

<p align="center">
  <img src="assets/images/logo.png" width="140" alt="Logo Hortifruti La Rose">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7E017?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/LGPD-Ready-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Online-success?style=for-the-badge">
</p>

> Site institucional desenvolvido para o **Hortifruti La Rose**, destacando qualidade, frescor e praticidade para os clientes em Brasília (DF).  
> Inclui carrossel dinâmico, produtos exclusivos, informações de lojas, LGPD/Consentimento de cookies, avaliações automáticas do Google e botão flutuante de WhatsApp.

---

## 🚀 Tecnologias Utilizadas

| Tipo | Ferramenta |
|------|-------------|
| **Frontend** | HTML5, Tailwind CSS, JavaScript ES6 |
| **Design Responsivo** | Flexbox + Grid (Mobile First) |
| **Interatividade** | JavaScript puro (`main.js`) |
| **Consentimento LGPD** | Módulo personalizado (`consent.js`) |
| **Avaliações Google** | Places API + Chave segura via `config.js` |
| **Mapa e SEO Local** | Google Maps + Schema.org |
| **Hospedagem** | GitHub Pages + Firebase Hosting (API Google) |

---

## 🧱 Estrutura do Projeto

```
/
├── index.html
├── js/
│   ├── main.js
│   ├── consent.js
│   ├── reviews.js
│   ├── config.js              ← chaves reais (não vai para o Git)
│   └── config.example.js      ← modelo público
├── assets/
│   ├── images/
│   ├── payments/
│   └── social/
├── .gitignore
└── README.md
```

---

## 🔧 Configuração Inicial

### 1️⃣ Arquivo `config.js`
- Contém suas **chaves reais** da API do Google (Places API).  
- **Nunca** envie este arquivo ao GitHub — ele já está protegido no `.gitignore`.

Exemplo de conteúdo real:
```js
export const CONFIG = {
  GOOGLE_API_KEY: "SUA_CHAVE_REAL",
  PLACE_ID: "SEU_PLACE_ID_REAL",
};
```

### 2️⃣ Arquivo `config.example.js`
- É um modelo público para que outros desenvolvedores saibam o formato da configuração.  
- Contém apenas placeholders (`SUA_CHAVE_DE_API_AQUI`).  
- Este arquivo **deve ser versionado no GitHub**.

### 3️⃣ Arquivo `.env`
- Alternativa para armazenar as chaves localmente em ambiente Node/Firebase.  
- Também está ignorado no Git e serve apenas para testes locais.

### 4️⃣ Firebase Hosting
- O projeto pode usar o **Firebase Hosting** para acessar as APIs do Google com mais segurança.  
- A chave API é vinculada ao projeto Firebase (ativar: “Places API” e “Places API (New)”).

---

## 🧩 Funcionalidades

### 🧭 Navegação e Carrosséis
- Menu responsivo (desktop e mobile).  
- Carrossel principal com **autoplay e indicadores**.  
- Carrossel de produtos exclusivos com **setas laterais** e **scroll suave**.

### 💬 Avaliações Google (API)
- Exibe automaticamente as **3 avaliações mais recentes** da loja no Google Maps.  
- Mostra nome, estrelas e texto do cliente.  
- Atualização dinâmica via `reviews.js`.

### 🛡️ Consentimento de Cookies (LGPD)
- Banner e modal de privacidade com opções **Aceitar / Negar / Personalizar**.  
- Salva consentimento no `localStorage`.  
- Link direto para **Política de Privacidade** hospedada no GitHub Pages.

### 📍 Lojas e SEO
- Mapa interativo do Google Maps com as lojas.  
- SEO otimizado com **OpenGraph**, **Twitter Cards** e **GeoTags**.

### 📞 Contato e Comunicação
- Formulário de sugestões e elogios.  
- Botão flutuante do **WhatsApp** para atendimento direto.  
- Rodapé com formas de pagamento, redes sociais e créditos do desenvolvedor.

---

## ⚙️ LGPD — Armazenamento Local

O banner de consentimento aparece apenas na **primeira visita** e é salvo localmente:

```js
localStorage.setItem("larose_cookie_consent", JSON.stringify({
  value: "accepted",
  date: new Date().toISOString()
}));
```

Código completo em `js/consent.js`.

---

## 📦 Execução Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/xaviermarcio/hortifruti-site.git
   ```

2. Acesse a pasta:
   ```bash
   cd hortifruti-site
   ```

3. Crie seu arquivo de configuração:
   ```bash
   cp js/config.example.js js/config.js
   ```
   E insira suas credenciais reais.

4. Abra o site no navegador:
   ```bash
   start index.html
   ```

> 💡 Por ser um projeto estático, não requer servidor local.  
> Pode ser hospedado no **GitHub Pages**, **Firebase Hosting** ou **Vercel**.

---

## 🌐 Demonstração

O projeto possui **duas versões oficiais** hospedadas em ambientes diferentes, cada uma com finalidades distintas:

| Ambiente | Descrição | Link |
|-----------|------------|------|
| 🧩 **GitHub Pages** | Versão pública e estática, ideal para exibição em portfólio. Não utiliza chaves ou APIs externas, garantindo total segurança e leveza. | 🔗 [https://xaviermarcio.github.io/hortifruti-site/](https://xaviermarcio.github.io/hortifruti-site/) |
| 🔑 **Firebase Hosting** | Versão completa e integrada com a **Google Places API**, exibindo as avaliações reais do Hortifruti La Rose diretamente do Google Maps. Requer chave de API e configuração do Firebase. | 🔗 [https://hortifruti-la-rose-site.web.app/](https://hortifruti-la-rose-site.web.app/) |

---

### ⚙️ Observações Técnicas

- Ambas as versões compartilham o **mesmo código-base** hospedado neste repositório.  
- O **GitHub Pages** é voltado para **exposição pública e portfólio**, sem chaves sensíveis.  
- O **Firebase Hosting** é usado para **funcionalidades dinâmicas**, como integração com APIs do Google.  
- O arquivo `config.js` (com as chaves) é **protegido pelo .gitignore** e **não é publicado** no repositório.

---

### 🧭 Como publicar atualizações

Atualize o código-fonte localmente e execute:

```bash
# 📦 Atualizar a versão pública no GitHub Pages
git add .
git commit -m "Atualização do site estático"
git push origin main

# 🔥 Atualizar a versão com API no Firebase Hosting
firebase deploy
```

Assim, seu projeto mantém duas frentes ativas:
- **GitHub Pages:** Portfólio limpo e acessível.
- **Firebase Hosting:** Site funcional com integração real da API do Google.

---

## 🧭 Melhorias Futuras

- Integração com **catálogo dinâmico** e sistema de pedidos.  
- Painel administrativo para atualização de encartes.  
- Versão multilíngue (português/inglês).  
- Otimização PWA com manifest.json e service worker.  
- Sistema de login para colaboradores.

---

## 📜 Licença

Projeto desenvolvido por **Márcio Xavier** para fins de **estudo, prática e portfólio profissional**.  
Distribuição permitida apenas para fins **educacionais e não comerciais**, mantendo a **menção obrigatória ao autor** em qualquer uso, modificação ou redistribuição.

© 2025 — Márcio Xavier. Todos os direitos reservados.

---

🫶 **Hortifruti La Rose** — Frescor, Qualidade e Tradição.
