(() => {
  'use strict';

  const html = document.documentElement;
  const btnDiminuir = document.getElementById('btn-diminuir-fonte');
  const btnAumentar = document.getElementById('btn-aumentar-fonte');
  const indicadorFonte = document.getElementById('indicador-fonte');
  const btnContraste = document.getElementById('btn-alto-contraste');

  const btnMenuMobile = document.getElementById('btn-menu-mobile');
  const navegacaoPrincipal = document.getElementById('navegacao-principal');

  const formBusca = document.getElementById('form-busca');
  const campoBusca = document.getElementById('campo-busca');
  const btnLimparInput = document.getElementById('btn-limpar-input');
  const tagsBusca = document.querySelectorAll('.tag-rapida[data-busca]');
  const botoesPerfil = document.querySelectorAll('.btn-perfil[data-perfil]');
  const cardsServico = document.querySelectorAll('.card-servico');
  const statusBusca = document.getElementById('status-busca');
  const estadoVazio = document.getElementById('estado-vazio');
  const termoVazio = document.getElementById('termo-vazio');
  const btnLimparFiltro = document.getElementById('btn-limpar-filtro');
  const btnResetarBusca = document.getElementById('btn-resetar-busca');
  const secaoServicos = document.getElementById('servicos');

  const toastAviso = document.getElementById('toast-aviso');
  const toastTexto = document.getElementById('toast-texto');
  const toastFechar = document.getElementById('toast-fechar');

  // --- Controles de Acessibilidade (Fonte e Alto Contraste) ---
  let tamanhoFonte = 100;
  const TAMANHO_MIN = 90;
  const TAMANHO_MAX = 120;
  const PASSO_FONTE = 10;

  function aplicarTamanhoFonte(valor) {
    tamanhoFonte = Math.min(TAMANHO_MAX, Math.max(TAMANHO_MIN, valor));
    html.style.fontSize = `${tamanhoFonte}%`;
    indicadorFonte.textContent = `${tamanhoFonte}%`;
    btnDiminuir.disabled = tamanhoFonte <= TAMANHO_MIN;
    btnAumentar.disabled = tamanhoFonte >= TAMANHO_MAX;

    try {
      localStorage.setItem('ro-portal-fonte', String(tamanhoFonte));
    } catch {
      // Ignora caso o armazenamento local esteja indisponível
    }
  }

  function aplicarAltoContraste(ativo) {
    if (ativo) {
      html.setAttribute('data-contrast', 'high');
    } else {
      html.removeAttribute('data-contrast');
    }
    btnContraste.setAttribute('aria-pressed', String(ativo));
    try {
      localStorage.setItem('ro-portal-contraste', ativo ? 'high' : 'normal');
    } catch {
      // Ignora caso o armazenamento local esteja indisponível
    }
  }

  try {
    const fonteSalva = Number(localStorage.getItem('ro-portal-fonte'));
    if (fonteSalva >= TAMANHO_MIN && fonteSalva <= TAMANHO_MAX) {
      aplicarTamanhoFonte(fonteSalva);
    } else {
      aplicarTamanhoFonte(100);
    }

    if (localStorage.getItem('ro-portal-contraste') === 'high') {
      aplicarAltoContraste(true);
    }
  } catch {
    aplicarTamanhoFonte(100);
  }

  btnDiminuir.addEventListener('click', () => {
    aplicarTamanhoFonte(tamanhoFonte - PASSO_FONTE);
  });

  btnAumentar.addEventListener('click', () => {
    aplicarTamanhoFonte(tamanhoFonte + PASSO_FONTE);
  });

  btnContraste.addEventListener('click', () => {
    const ativo = html.getAttribute('data-contrast') === 'high';
    aplicarAltoContraste(!ativo);
  });

  // --- Menu Mobile ---
  if (btnMenuMobile && navegacaoPrincipal) {
    btnMenuMobile.addEventListener('click', () => {
      const aberto = navegacaoPrincipal.classList.toggle('navegacao--aberta');
      btnMenuMobile.setAttribute('aria-expanded', String(aberto));
      btnMenuMobile.setAttribute(
        'aria-label',
        aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
      );
    });

    navegacaoPrincipal.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navegacaoPrincipal.classList.remove('navegacao--aberta');
        btnMenuMobile.setAttribute('aria-expanded', 'false');
        btnMenuMobile.setAttribute('aria-label', 'Abrir menu de navegação');
      });
    });
  }

  // --- Busca e Filtro de Serviços ---
  let perfilAtivo = 'todos';
  const NOMES_PERFIL = {
    todos: 'Todos os públicos',
    cidadao: 'Cidadão',
    servidor: 'Servidor Público',
    empresa: 'Empresa',
  };

  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function atualizarBotoesPerfil(perfilSelecionado) {
    perfilAtivo = perfilSelecionado;
    botoesPerfil.forEach((botao) => {
      const ativo = botao.dataset.perfil === perfilSelecionado;
      botao.setAttribute('aria-pressed', String(ativo));
    });
  }

  function atualizarTagsRapidas(termoNormalizado) {
    tagsBusca.forEach((tag) => {
      const corresponde =
        Boolean(termoNormalizado) &&
        normalizarTexto(tag.dataset.busca || '') === termoNormalizado;
      tag.setAttribute('aria-pressed', String(corresponde));
    });
  }

  function filtrarServicos(termoBruto, rolarAteServicos = false) {
    const termoNormalizado = normalizarTexto(termoBruto);
    let encontrados = 0;

    btnLimparInput.hidden = termoBruto.length === 0;
    atualizarTagsRapidas(termoNormalizado);

    cardsServico.forEach((card) => {
      const conteudo = normalizarTexto(
        `${card.textContent} ${card.dataset.palavras || ''}`
      );
      const perfisCard = (card.dataset.perfis || '').split(/\s+/);
      const correspondeBusca = !termoNormalizado || conteudo.includes(termoNormalizado);
      const correspondePerfil = perfilAtivo === 'todos' || perfisCard.includes(perfilAtivo);
      const visivel = correspondeBusca && correspondePerfil;

      card.hidden = !visivel;
      if (visivel) {
        encontrados += 1;
      }
    });

    const filtroAtivo = Boolean(termoNormalizado) || perfilAtivo !== 'todos';

    if (!filtroAtivo) {
      statusBusca.textContent = '';
      estadoVazio.hidden = true;
      btnLimparFiltro.hidden = true;
      return;
    }

    btnLimparFiltro.hidden = false;

    const contextoPerfil =
      perfilAtivo !== 'todos' ? ` no perfil ${NOMES_PERFIL[perfilAtivo]}` : '';
    const contextoBusca = termoNormalizado ? ` para "${termoBruto}"` : '';

    if (encontrados === 0) {
      statusBusca.textContent = `Nenhum serviço encontrado${contextoBusca}${contextoPerfil}.`;
      termoVazio.textContent = termoBruto || NOMES_PERFIL[perfilAtivo];
      estadoVazio.hidden = false;
    } else {
      const plural = encontrados === 1 ? 'serviço encontrado' : 'serviços encontrados';
      statusBusca.textContent = `${encontrados} ${plural}${contextoBusca}${contextoPerfil}.`;
      estadoVazio.hidden = true;
    }

    if (rolarAteServicos && secaoServicos) {
      secaoServicos.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function limparBusca() {
    campoBusca.value = '';
    atualizarBotoesPerfil('todos');
    filtrarServicos('');
    campoBusca.focus();
  }

  botoesPerfil.forEach((botao) => {
    botao.addEventListener('click', () => {
      atualizarBotoesPerfil(botao.dataset.perfil || 'todos');
      filtrarServicos(campoBusca.value, false);
    });
  });

  formBusca.addEventListener('submit', (evento) => {
    evento.preventDefault();
    filtrarServicos(campoBusca.value, true);
  });

  campoBusca.addEventListener('input', () => {
    filtrarServicos(campoBusca.value, false);
  });

  btnLimparInput.addEventListener('click', () => {
    campoBusca.value = '';
    filtrarServicos('');
    campoBusca.focus();
  });

  tagsBusca.forEach((tag) => {
    tag.addEventListener('click', () => {
      const termo = tag.dataset.busca || '';
      campoBusca.value = termo;
      atualizarBotoesPerfil('todos');
      filtrarServicos(termo, true);
    });
  });

  btnLimparFiltro.addEventListener('click', limparBusca);
  btnResetarBusca.addEventListener('click', limparBusca);

  // --- Toast de Aviso para Links Simulados do Protótipo ---
  let timerToast;

  function mostrarToast(mensagem) {
    toastTexto.textContent = mensagem;
    toastAviso.hidden = false;
    clearTimeout(timerToast);
    timerToast = setTimeout(() => {
      toastAviso.hidden = true;
    }, 5000);
  }

  toastFechar.addEventListener('click', () => {
    clearTimeout(timerToast);
    toastAviso.hidden = true;
  });

  const linksSimulados = document.querySelectorAll(
    '.card-servico__link, .card-institucional .btn-secundario, .card-noticia__link, .card-noticia__capa-link, .link-ver-todas'
  );

  linksSimulados.forEach((link) => {
    link.addEventListener('click', (evento) => {
      evento.preventDefault();
      const card = link.closest('article');
      const tituloCard = card ? card.querySelector('h3')?.textContent?.trim() : '';
      const alvo = tituloCard || link.textContent.trim();
      mostrarToast(
        `Protótipo conceitual: este link abriria "${alvo}" no portal oficial.`
      );
    });
  });
})();
