/**
 * Chatbot Widget Auto-Injetável - BordBella Ateliê
 */
(function () {
  if (window.chatbotInicializado) return;
  window.chatbotInicializado = true;

  // 1. ESTILOS CSS
  const cssStyles = `
    #faq-chatbot-widget {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important;
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 99999999 !important;
    }

    #faq-toggle-btn {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #83274e, #611938) !important;
      color: #ffffff !important;
      border: 2px solid #ffffff !important;
      box-shadow: 0 4px 18px rgba(131, 39, 78, 0.4) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      outline: none !important;
      transition: transform 0.3s ease !important;
    }

    #faq-toggle-btn:hover {
      transform: scale(1.08) !important;
    }

    #faq-toggle-btn svg {
      width: 28px !important;
      height: 28px !important;
      fill: #ffffff !important;
      pointer-events: none !important;
    }

    #faq-chat-window {
      position: fixed !important;
      bottom: 90px !important;
      right: 20px !important;
      width: 360px !important;
      max-width: calc(100vw - 40px) !important;
      height: 500px !important;
      max-height: calc(100vh - 120px) !important;
      background-color: #ffffff !important;
      border-radius: 18px !important;
      box-shadow: 0 10px 30px rgba(131, 39, 78, 0.2) !important;
      border: 1px solid #f0d2dd !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 99999999 !important;
    }

    .faq-hidden { display: none !important; }

    .faq-header {
      background: linear-gradient(135deg, #83274e, #611938) !important;
      color: #ffffff !important;
      padding: 14px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .faq-header-actions {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      font-size: 15px !important;
      color: #ffffff !important;
      font-weight: 700 !important;
    }

    .faq-icon-btn {
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 18px !important;
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 4px 6px !important;
      opacity: 0.9 !important;
      user-select: none !important;
    }

    .faq-close-click {
      color: #ffffff !important;
      font-size: 20px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      padding: 4px 8px !important;
      line-height: 1 !important;
      display: inline-block !important;
      user-select: none !important;
      z-index: 999999 !important;
    }

    .faq-close-click:hover {
      color: #f7e2ea !important;
      transform: scale(1.2);
    }

    #faq-messages {
      flex: 1 !important;
      padding: 14px !important;
      overflow-y: auto !important;
      background-color: #fdf5f7 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
    }

    .faq-msg {
      max-width: 85% !important;
      padding: 10px 14px !important;
      border-radius: 14px !important;
      font-size: 13.5px !important;
      line-height: 1.45 !important;
    }

    .faq-msg.bot {
      align-self: flex-start !important;
      background-color: #ffffff !important;
      color: #333333 !important;
      border: 1px solid #f0d2dd !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02) !important;
    }

    .faq-msg.user {
      align-self: flex-end !important;
      background-color: #83274e !important;
      color: #ffffff !important;
    }

    .faq-msg.system-info {
      align-self: center !important;
      background-color: #fce8ef !important;
      color: #83274e !important;
      font-size: 11.5px !important;
      border-radius: 8px !important;
      padding: 6px 10px !important;
      text-align: center !important;
      font-weight: 600 !important;
    }

    .faq-options {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      margin-top: 4px !important;
    }

    .faq-chip {
      background-color: #ffffff !important;
      color: #83274e !important;
      border: 1px solid #f0d2dd !important;
      padding: 8px 12px !important;
      border-radius: 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }

    .faq-chip:hover {
      background-color: #83274e !important;
      color: #ffffff !important;
    }

    .faq-footer {
      padding: 12px !important;
      background-color: #ffffff !important;
      border-top: 1px solid #f0d2dd !important;
    }

    .faq-input-area {
      display: flex !important;
      gap: 8px !important;
      margin: 0 !important;
    }

    #faq-input {
      flex: 1 !important;
      padding: 10px 14px !important;
      border: 1px solid #f0d2dd !important;
      border-radius: 20px !important;
      font-size: 13.5px !important;
      outline: none !important;
    }

    #faq-input:focus {
      border-color: #83274e !important;
    }

    #faq-send-btn {
      background-color: #83274e !important;
      color: #ffffff !important;
      border: none !important;
      width: 38px !important;
      height: 38px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    #faq-send-btn svg {
      width: 18px !important;
      height: 18px !important;
      fill: #ffffff !important;
    }
  `;

  // 2. ESTRUTURA HTML
  const htmlTemplate = `
    <button id="faq-toggle-btn" type="button" aria-label="Abrir Chatbot">
      <svg id="faq-icon-open" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
      </svg>
      <svg id="faq-icon-close" viewBox="0 0 24 24" style="display: none;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

   <div id="faq-chat-window" class="faq-hidden" style="display: none !important;">
      <div class="faq-header">
        <h3>Atendimento BordBella 🎀</h3>
        <div class="faq-header-actions">
          <label for="faq-json-file" class="faq-icon-btn" title="Anexar base JSON extra">📁</label>
          <input type="file" id="faq-json-file" accept=".json" style="display: none;" />
          <span id="faq-close-btn" class="faq-close-click" title="Fechar Chat">✕</span>
        </div>
      </div>
      <div id="faq-messages"></div>
      <div class="faq-footer">
        <div class="faq-input-area">
          <input type="text" id="faq-input" placeholder="Digite sua dúvida..." autocomplete="off" />
          <button type="button" id="faq-send-btn" aria-label="Enviar">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // 3. BASE DE DADOS PADRÃO
  const FAQ_PADRAO = [
    { titulo: "🕒 Horário do Ateliê", keywords: ["horario", "horas", "funciona", "aberto"], resposta: "Atendemos de **Segunda a Sexta, das 08h às 18h** e **Sábados das 08h às 12h**." },
    { titulo: "💳 Formas de Pagamento", keywords: ["pagamento", "pagar", "pix", "cartao", "boleto"], resposta: "Aceitamos **Pix com desconto**, **Cartão em até 6x** e **Boleto**." },
    { titulo: "📍 Onde Fica o Ateliê?", keywords: ["onde", "endereco", "localizacao", "fica", "campinas"], resposta: "Nosso ateliê fica em **Campinas - SP** e enviamos com amor para **todo o Brasil**!" },
    { titulo: "🚚 Prazos e Entregas", keywords: ["prazo", "entrega", "frete", "chega"], resposta: "O tempo de produção é de **7 a 10 dias úteis** após a aprovação da arte." },
    { titulo: "💬 Falar no WhatsApp", keywords: ["whatsapp", "contato", "atendente", "falar", "humano", "telefone"], resposta: "Quer tirar dúvidas ou fazer um orçamento rápido? [Clique aqui para falar conosco no WhatsApp](https://wa.me/5512992040625)!" }
  ];

  let baseConhecimento = [...FAQ_PADRAO];

  // 4. FUNÇÃO DE INICIALIZAÇÃO
  window.initChatbot = function (opcoes = {}) {
    if (document.getElementById("faq-chatbot-widget")) return;

    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

    const container = document.createElement("div");
    container.id = "faq-chatbot-widget";
    container.innerHTML = htmlTemplate;
    document.body.appendChild(container);

    const toggleBtn = document.getElementById("faq-toggle-btn");
    const closeBtn = document.getElementById("faq-close-btn");
    const chatWindow = document.getElementById("faq-chat-window");
    const iconOpen = document.getElementById("faq-icon-open");
    const iconClose = document.getElementById("faq-icon-close");
    const messagesBox = document.getElementById("faq-messages");
    const sendBtn = document.getElementById("faq-send-btn");
    const input = document.getElementById("faq-input");
    const jsonFileInput = document.getElementById("faq-json-file");

   function fecharJanelaChat() {
      chatWindow.classList.add("faq-hidden");
      chatWindow.style.setProperty("display", "none", "important");
      iconOpen.style.display = "block";
      iconClose.style.display = "none";
    }

    function abrirJanelaChat() {
      chatWindow.classList.remove("faq-hidden");
      chatWindow.style.setProperty("display", "flex", "important");
      iconOpen.style.display = "none";
      iconClose.style.display = "block";
      input.focus();
    }

    function addMessage(texto, tipo) {
      const div = document.createElement("div");
      div.className = `faq-msg ${tipo}`;
      div.innerHTML = texto
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #83274e; font-weight: bold; text-decoration: underline;">$1</a>');
      messagesBox.appendChild(div);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function carregarMenuInicial() {
      messagesBox.innerHTML = "";
      addMessage("Olá, mamãe! 👋 Bem-vinda ao BordBella Ateliê! Como posso te ajudar hoje?", "bot");

      const optsContainer = document.createElement("div");
      optsContainer.className = "faq-options";

      baseConhecimento.forEach(item => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faq-chip";
        btn.innerText = item.titulo;
        btn.addEventListener("click", () => {
          addMessage(item.titulo, "user");
          setTimeout(() => addMessage(item.resposta, "bot"), 200);
        });
        optsContainer.appendChild(btn);
      });

      messagesBox.appendChild(optsContainer);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function normalizarTexto(txt) {
      return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "");
    }

    function buscarResposta(textoUsuario) {
      const queryNorm = normalizarTexto(textoUsuario);
      const palavrasUsuario = queryNorm.split(/\s+/).filter(w => w.length > 2);

      let melhorMatch = null;
      let maiorPontuacao = 0;

      baseConhecimento.forEach(item => {
        let pontos = 0;
        const pergunta = normalizarTexto(item.titulo || item.pergunta || "");
        const resposta = normalizarTexto(item.resposta || "");

        if (pergunta.includes(queryNorm)) pontos += 10;

        palavrasUsuario.forEach(palavra => {
          if (pergunta.includes(palavra)) pontos += 3;
          if (resposta.includes(palavra)) pontos += 1;
          if (item.keywords && Array.isArray(item.keywords)) {
            item.keywords.forEach(kw => {
              if (normalizarTexto(kw).includes(palavra)) pontos += 4;
            });
          }
        });

        if (pontos > maiorPontuacao) {
          maiorPontuacao = pontos;
          melhorMatch = item;
        }
      });

      if (melhorMatch && maiorPontuacao >= 3) {
        return melhorMatch.resposta;
      }
      return "Ainda estou aprendendo! 💖 Se quiser uma ajuda personalizada, [clique aqui para falar direto conosco no WhatsApp](https://wa.me/5512992040625).";
    }

    function dispararEnvio() {
      const txt = input.value.trim();
      if (!txt) return;

      addMessage(txt, "user");
      input.value = "";

      setTimeout(() => {
        addMessage(buscarResposta(txt), "bot");
      }, 300);
    }

    // --- EVENTOS DE CLIQUE DOS BOTÕES ---
    toggleBtn.addEventListener("click", function() {
      if (chatWindow.classList.contains("faq-hidden")) {
        abrirJanelaChat();
      } else {
        fecharJanelaChat();
      }
    });

    closeBtn.onclick = function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      fecharJanelaChat();
    };

    sendBtn.addEventListener("click", dispararEnvio);

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dispararEnvio();
      }
    });

    if (opcoes.jsonUrl) {
      fetch(opcoes.jsonUrl)
        .then(res => res.json())
        .then(dados => {
          if (Array.isArray(dados)) {
            baseConhecimento = [...dados];
            carregarMenuInicial();
          }
        })
        .catch(err => console.error("Erro ao carregar JSON:", err));
    }

    jsonFileInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const json = JSON.parse(evt.target.result);
          if (Array.isArray(json)) {
            baseConhecimento = [...json];
            carregarMenuInicial();
            addMessage(`📂 Base extra do ateliê carregada!`, "system-info");
          }
        } catch (err) {
          alert("Arquivo JSON inválido.");
        }
      };
      reader.readAsText(file);
    });

    carregarMenuInicial();
    fecharJanelaChat(); // Garante que inicia fechado
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      window.initChatbot();
    });
  } else {
    window.initChatbot();
  }
})();